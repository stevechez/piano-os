/**
 * Central pricing configuration. Every price shown in the product reads
 * from here — never hardcode an amount or plan name in a component.
 * See docs/43-commerce-and-checkout.md.
 *
 * Actual Stripe Price IDs live in env vars (created once in the Stripe
 * dashboard/MCP, referenced everywhere else) so they can change without a
 * code deploy.
 */

export type PlanId = "monthly" | "annual";

export interface PricingPlan {
  id: PlanId;
  name: string;
  interval: "month" | "year";
  /** Amount in cents. */
  amount: number;
  currency: "usd";
  /** Short marketing badge, e.g. "Save 35%". */
  badge?: string;
  /** Env var holding this plan's Stripe Price ID. */
  priceEnvVar: "STRIPE_PRICE_MONTHLY" | "STRIPE_PRICE_ANNUAL";
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    interval: "month",
    amount: 1900,
    currency: "usd",
    priceEnvVar: "STRIPE_PRICE_MONTHLY",
  },
  {
    id: "annual",
    name: "Annual",
    interval: "year",
    amount: 14900,
    currency: "usd",
    badge: "Save 35%",
    priceEnvVar: "STRIPE_PRICE_ANNUAL",
  },
];

export function getPlan(planId: PlanId): PricingPlan {
  const plan = PRICING_PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error(`Unknown plan: "${planId}"`);
  return plan;
}

export function formatPrice(amountCents: number, currency: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: amountCents % 100 === 0 ? 0 : 2,
  }).format(amountCents / 100);
}

/** Server-only: resolves a plan's actual Stripe Price ID from env. */
export function getStripePriceId(planId: PlanId): string {
  const plan = getPlan(planId);
  const priceId = process.env[plan.priceEnvVar];
  if (!priceId) {
    throw new Error(
      `Missing env var ${plan.priceEnvVar} — create the Price in Stripe and set it in .env.local.`
    );
  }
  return priceId;
}
