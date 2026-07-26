import { redirect } from "next/navigation";

/**
 * There is no free password signup — see docs/43-commerce-and-checkout.md.
 * Accounts are created automatically after a Stripe purchase. Anyone who
 * lands here (an old link, a bookmark) gets sent to the actual entry
 * point instead of a dead form.
 */
export default function SignupPage() {
  redirect("/learn/complete");
}
