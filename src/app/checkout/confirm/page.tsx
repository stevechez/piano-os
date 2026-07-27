import { redirect } from "next/navigation";
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
 * docs/43-commerce-and-checkout.md "Checkout".
 *
 * A page (not a route handler) on purpose: this does several sequential
 * Stripe/Supabase calls before it can redirect, and a route handler has no
 * way to show anything while that runs — the browser just sits on a blank
 * request. As a page, the sibling loading.tsx renders instantly and stays
 * up for the whole await chain. See docs/43-commerce-and-checkout.md
 * Decision 004.
 *
 * Idempotent and safe to race with the checkout.session.completed webhook:
 * whichever of the two gets here first does the provisioning work, and the
 * other is a harmless no-op (see provisioning.ts).
 */
export default async function CheckoutConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/learn/complete");
  }

  // A stale, reused, or tampered-with session_id makes Stripe throw rather
  // than return null — send the customer back to try again instead of
  // crashing on what should be a graceful "this link didn't work" case.
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    redirect("/learn/complete");
  }

  const email = session.customer_details?.email;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!email || !customerId) {
    redirect("/learn/complete");
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
    redirect(`/login?redirectTo=/learn&email=${encodeURIComponent(email)}`);
  }

  // ?welcome=1 tells /learn this is a brand-new purchase, not a routine
  // returning visit — see docs/44-learning-curriculum-architecture.md.
  const params = new URLSearchParams({
    token_hash: linkData.properties.hashed_token,
    type: "magiclink",
    next: "/learn?welcome=1",
  });

  redirect(`/auth/confirm?${params.toString()}`);
}
