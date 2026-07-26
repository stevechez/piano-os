import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PlanId } from "./pricing";

/**
 * Shared, idempotent account/subscription provisioning. Called from both
 * the Stripe webhook handler and /api/checkout/complete (the success-page
 * redirect), since either one might "win the race" to process a given
 * checkout first. Every operation here is safe to run more than once.
 * See docs/43-commerce-and-checkout.md.
 */

export interface ProvisionResult {
  userId: string;
}

/**
 * Ensures a Supabase auth user + profile exists for this Stripe customer,
 * creating one (passwordless — see /auth/confirm) if this is their first
 * purchase. Matches first by stripe_customer_id, then by email, so a
 * returning customer re-subscribing doesn't get a duplicate account.
 */
export async function ensureAccountForCustomer(params: {
  email: string;
  stripeCustomerId: string;
  displayName?: string | null;
}): Promise<ProvisionResult> {
  const { email, stripeCustomerId, displayName } = params;
  const admin = createAdminClient();

  const { data: byCustomer } = await admin
    .from("profiles")
    .select("user_id")
    .eq("stripe_customer_id", stripeCustomerId)
    .maybeSingle();

  if (byCustomer) {
    return { userId: byCustomer.user_id as string };
  }

  const { data: byEmail } = await admin
    .from("profiles")
    .select("user_id")
    .eq("email", email)
    .maybeSingle();

  let userId: string;

  if (byEmail) {
    userId = byEmail.user_id as string;
  } else {
    const { data: created, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: displayName ? { display_name: displayName } : undefined,
    });

    if (error || !created.user) {
      throw new Error(
        `Failed to create user for ${email}: ${error?.message ?? "unknown error"}`
      );
    }

    userId = created.user.id;
  }

  // Upsert rather than update: the handle_new_user trigger should have
  // already created the profiles row, but don't depend on that timing.
  await admin
    .from("profiles")
    .upsert(
      { user_id: userId, email, stripe_customer_id: stripeCustomerId },
      { onConflict: "user_id" }
    );

  return { userId };
}

function planIdFromPriceId(priceId?: string | null): PlanId | null {
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_MONTHLY) return "monthly";
  if (priceId === process.env.STRIPE_PRICE_ANNUAL) return "annual";
  return null;
}

/** Maps Stripe's subscription statuses onto PianoOS's simpler set. */
function mapStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "paused":
      return "canceled";
    case "incomplete":
    case "incomplete_expired":
    default:
      return "expired";
  }
}

/**
 * Upserts a subscription's full state. Looks the owning user up by
 * stripe_customer_id — if no profile exists yet for that customer (e.g.
 * this event arrived before checkout.session.completed finished
 * provisioning the account), it's a safe no-op: whichever handler runs
 * once the account exists will record the subscription.
 */
export async function upsertSubscriptionFromStripe(
  subscription: Stripe.Subscription
): Promise<void> {
  const admin = createAdminClient();
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const { data: profile } = await admin
    .from("profiles")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!profile) return;

  const userId = profile.user_id as string;
  const price = subscription.items.data[0]?.price;
  const plan = planIdFromPriceId(price?.id);
  const status = mapStatus(subscription.status);

  // `current_period_end` lives on the subscription item as of recent
  // Stripe API versions; fall back defensively if it's absent.
  const periodEndSeconds =
    (subscription as unknown as { current_period_end?: number })
      .current_period_end ?? subscription.items.data[0]?.current_period_end;

  await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: price?.id ?? null,
      plan,
      status,
      current_period_end: periodEndSeconds
        ? new Date(periodEndSeconds * 1000).toISOString()
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" }
  );

  await admin
    .from("profiles")
    .update({ subscription_status: status, subscription_plan: plan })
    .eq("user_id", userId);
}

/**
 * Idempotency guard for webhook delivery — two functions, deliberately
 * separate. Check before processing; record only after processing
 * succeeds. (Recording before processing would permanently skip an event
 * whose handler failed, since Stripe's retry would then see it as
 * "already done.") The downstream upserts are themselves idempotent too,
 * so a rare concurrent-delivery race here is harmless either way.
 */
export async function wasEventAlreadyProcessed(eventId: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("processed_stripe_events")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();

  return !!data;
}

export async function recordEventProcessed(eventId: string): Promise<void> {
  const admin = createAdminClient();
  // Ignore unique-violation races from concurrent deliveries — harmless.
  await admin.from("processed_stripe_events").insert({ event_id: eventId });
}
