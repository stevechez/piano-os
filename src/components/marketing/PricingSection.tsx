import { Check } from "lucide-react";
import { Container } from "./container";

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
              <span className="inline-flex items-center rounded-full bg-gold/15 px-3.5 py-1.5 text-xs font-medium tracking-wide text-gold">
                Early Access
              </span>

              <h3 className="mt-5 font-serif text-2xl text-foreground">
                PianoOS Early Access
              </h3>

              <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                Join the first group of adult learners and help shape PianoOS as
                it grows.
              </p>
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
