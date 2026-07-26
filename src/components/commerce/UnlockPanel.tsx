"use client";

import { useState, useTransition } from "react";
import { createCheckoutSession } from "@/lib/stripe/actions";
import { PRICING_PLANS, formatPrice, type PlanId } from "@/lib/stripe/pricing";
import { cn } from "@/lib/utils";

/**
 * The one and only purchase moment in the product — see
 * docs/43-commerce-and-checkout.md. Plan selection is local UI state;
 * clicking Unlock hands off straight to Stripe Checkout via a server
 * action. No intermediate signup screen.
 */
export function UnlockPanel() {
  const [selected, setSelected] = useState<PlanId>("annual");
  const [isPending, startTransition] = useTransition();

  function handleUnlock() {
    startTransition(() => {
      void createCheckoutSession(selected);
    });
  }

  return (
    <div className="mt-8 rounded-3xl border border-gold/30 bg-gold/[0.06] p-8">
      <p className="text-center font-serif text-xl text-foreground">
        Continue the journey with PianoOS.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PRICING_PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelected(plan.id)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-colors",
              selected === plan.id
                ? "border-gold bg-gold/10"
                : "border-border/80 hover:bg-card/50"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-serif text-lg text-foreground">{plan.name}</span>
              {plan.badge && (
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-gold uppercase">
                  {plan.badge}
                </span>
              )}
            </div>
            <div className="mt-1 text-muted-foreground">
              {formatPrice(plan.amount, plan.currency)} / {plan.interval}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleUnlock}
        disabled={isPending}
        className="mt-6 w-full rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Redirecting to checkout…" : "Unlock PianoOS"}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Cancel anytime. Secure checkout powered by Stripe.
      </p>
    </div>
  );
}
