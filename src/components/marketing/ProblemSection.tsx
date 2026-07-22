import { ArrowRight } from "lucide-react";
import { Container } from "./container";

const problems = [
  "I bought a piano but don't know where to start.",
  "Sheet music feels overwhelming.",
  "Apps teach songs but not understanding.",
  "I stopped lessons because they weren't inspiring.",
];

const traditional = ["Notes", "Sheet Music", "Practice", "Song"];
const pianoOS = ["Patterns", "Chords", "Songs", "Musical Freedom"];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="font-serif text-3xl leading-[1.15] font-medium tracking-tight text-balance md:text-4xl">
            You bought the piano.
            <br />
            Now what?
          </h2>

          <div className="divide-y divide-border/80 border-t border-border/80">
            {problems.map((item, i) => (
              <div key={item} className="flex items-start gap-6 py-6">
                <span className="font-serif text-sm text-gold">0{i + 1}</span>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-serif text-2xl leading-[1.15] font-medium tracking-tight md:text-3xl">
            A different way to learn piano.
          </h3>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border/80">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border/80 bg-card/40 px-8 py-7 sm:px-10">
              <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Traditional approach
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground/70 line-through decoration-muted-foreground/40">
                {traditional.map((step, i) => (
                  <span key={step} className="flex items-center gap-3">
                    {i > 0 && <ArrowRight className="h-3.5 w-3.5" />}
                    <span className="font-serif text-lg">{step}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 px-8 py-8 sm:px-10">
              <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
                PianoOS approach
              </span>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
                {pianoOS.map((step, i) => (
                  <span key={step} className="flex items-center gap-4">
                    {i > 0 && (
                      <ArrowRight
                        className="h-4 w-4 text-gold/60"
                        strokeWidth={1.75}
                      />
                    )}
                    <span className="font-serif text-xl text-foreground md:text-2xl">
                      {step}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
