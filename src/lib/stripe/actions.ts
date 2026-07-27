"use server";

import { redirect } from "next/navigation";
import { stripe } from "./server";
import { getStripePriceId, type PlanId } from "./pricing";
import { createClient } from "@/lib/supabase/server";

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

/**
 * Starts a Stripe Checkout session for a subscription. No account is
 * required to reach this — per docs/43-commerce-and-checkout.md, payment
 * happens before the account exists. The account is created by
 * /checkout/confirm once payment succeeds.
 */
export async function createCheckoutSession(planId: PlanId): Promise<void> {
  const priceId = getStripePriceId(planId);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl()}/checkout/confirm?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl()}/learn/complete`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  redirect(session.url);
}

/**
 * Sends a signed-in customer to Stripe's hosted Customer Portal to manage
 * their payment method, invoices, or subscription.
 */
export async function createPortalSession(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.stripe_customer_id) {
    redirect("/account");
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${appUrl()}/account`,
  });

  redirect(portalSession.url);
}
