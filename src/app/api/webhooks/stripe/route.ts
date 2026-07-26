import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import {
  ensureAccountForCustomer,
  recordEventProcessed,
  upsertSubscriptionFromStripe,
  wasEventAlreadyProcessed,
} from "@/lib/stripe/provisioning";

/**
 * Stripe webhook handler. Verifies the signature, dedupes by event id, then
 * handles the six event types required for subscription billing. See
 * docs/43-commerce-and-checkout.md.
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (await wasEventAlreadyProcessed(event.id)) {
    return NextResponse.json({ received: true, deduped: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "subscription" && session.subscription) {
          const email = session.customer_details?.email;
          const customerId =
            typeof session.customer === "string"
              ? session.customer
              : session.customer?.id;

          if (email && customerId) {
            // Idempotent — /api/checkout/complete may have already done
            // this via the success-page redirect racing this webhook.
            await ensureAccountForCustomer({ email, stripeCustomerId: customerId });

            const subscriptionId =
              typeof session.subscription === "string"
                ? session.subscription
                : session.subscription.id;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            await upsertSubscriptionFromStripe(subscription);
          }
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscriptionFromStripe(subscription);
        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice & {
          subscription?: string | Stripe.Subscription | null;
        };
        const subscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          await upsertSubscriptionFromStripe(subscription);
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    // Let Stripe retry — the event id is already marked processed only on
    // success below; on error we still return 500 so Stripe redelivers.
    console.error(`Stripe webhook handler error for ${event.type}:`, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  await recordEventProcessed(event.id);
  return NextResponse.json({ received: true });
}
