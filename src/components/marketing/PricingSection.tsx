import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "./container";
import { PRICING_PLANS, formatPrice } from "@/lib/stripe/pricing";

const included = [
  "Full method: patterns, chords, and harmony",
  "Real songs from day one",
  "Personal AI piano coach",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20">
      <Container>
        <h2 className="font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
          Simple pricing.
        </h2>

        <div className="mt-14 overflow-hidden rounded-3xl border border-gold/30 bg-card/40">
          <div className="grid gap-10 p-9 md:grid-cols-[1.2fr_1fr] md:p-12">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {PRICING_PLANS.map((plan, i) => (
                  <span key={plan.id} className="flex items-baseline gap-3">
                    {i > 0 && <span className="text-muted-foreground">or</span>}
                    <span className="font-serif text-3xl text-foreground">
                      {formatPrice(plan.amount, plan.currency)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {plan.interval}
                    </span>
                    {plan.badge && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium tracking-wide text-gold">
                        {plan.badge}
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
                Try Module 1 free — no account required. Unlock the rest
                whenever it clicks.
              </p>

              <Link
                href="/learn"
                className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
              >
                Start Learning Free
              </Link>
            </div>

            <ul className="space-y-4 self-center">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={2}
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
