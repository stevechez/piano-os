import Stripe from "stripe";

/**
 * Server-only Stripe client. Never import this from a Client Component —
 * it holds the secret key.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
