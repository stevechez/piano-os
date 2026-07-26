import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  ensureAccountForCustomer,
  upsertSubscriptionFromStripe,
} from "@/lib/stripe/provisioning";

/**
 * Stripe Checkout success_url target. Runs in the customer's own browser
 * right after payment, so — unlike the webhook — it can finish the job by
 * establishing a real signed-in session. See
 * docs/43-commerce-and-checkout.md "Step 5: Successful Payment".
 *
 * Idempotent and safe to race with the checkout.session.completed webhook:
 * whichever of the two gets here first does the provisioning work, and the
 * other is a harmless no-op (see provisioning.ts).
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/learn/complete", request.url));
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const email = session.customer_details?.email;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!email || !customerId) {
    return NextResponse.redirect(new URL("/learn/complete", request.url));
  }

  await ensureAccountForCustomer({ email, stripeCustomerId: customerId });

  if (session.subscription) {
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription.id;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await upsertSubscriptionFromStripe(subscription);
  }

  const admin = createAdminClient();
  const { data: linkData, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (error || !linkData?.properties?.hashed_token) {
    // Account and subscription are safely recorded either way — just
    // couldn't auto-sign-in. Send them to sign in manually rather than
    // losing the purchase.
    return NextResponse.redirect(
      new URL(`/login?redirectTo=/learn&email=${encodeURIComponent(email)}`, request.url)
    );
  }

  const confirmUrl = new URL("/auth/confirm", request.url);
  confirmUrl.searchParams.set("token_hash", linkData.properties.hashed_token);
  confirmUrl.searchParams.set("type", "magiclink");
  confirmUrl.searchParams.set("next", "/learn");

  return NextResponse.redirect(confirmUrl);
}
