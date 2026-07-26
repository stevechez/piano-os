import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createPortalSession } from "@/lib/stripe/actions";
import { getPlan, formatPrice, type PlanId } from "@/lib/stripe/pricing";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  trialing: "Trial",
  past_due: "Past due",
  canceled: "Cancelled",
  expired: "Expired",
  none: "No plan",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, stripe_customer_id, subscription_status, subscription_plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan = profile?.subscription_plan
    ? getPlan(profile.subscription_plan as PlanId)
    : null;
  const status = profile?.subscription_status ?? "none";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        Your Account
      </h1>
      <p className="mt-1 text-muted-foreground">{profile?.email ?? user.email}</p>

      <div className="mt-10 rounded-3xl border border-border/80 bg-card/40 p-7 sm:p-8">
        {profile?.stripe_customer_id ? (
          <>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
                status === "active" || status === "trialing"
                  ? "bg-gold/15 text-gold"
                  : "bg-destructive/15 text-destructive"
              )}
            >
              {STATUS_LABEL[status] ?? status}
            </span>

            <h2 className="mt-4 font-serif text-2xl text-foreground">
              {plan ? `PianoOS ${plan.name}` : "PianoOS"}
            </h2>

            {plan && (
              <p className="mt-1 text-muted-foreground">
                {formatPrice(plan.amount, plan.currency)} / {plan.interval}
              </p>
            )}

            {subscription?.current_period_end && (
              <p className="mt-1 text-sm text-muted-foreground">
                {subscription.cancel_at_period_end ? "Cancels" : "Renews"} on{" "}
                {new Date(subscription.current_period_end).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}

            <form action={createPortalSession}>
              <button
                type="submit"
                className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
              >
                Manage Billing
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Update your payment method, view invoices, or cancel — all through Stripe&rsquo;s
              secure billing portal.
            </p>
          </>
        ) : (
          <>
            <p className="text-foreground">You don&rsquo;t have a PianoOS plan yet.</p>
            <Link
              href="/learn/complete"
              className="mt-4 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
            >
              Unlock PianoOS
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
