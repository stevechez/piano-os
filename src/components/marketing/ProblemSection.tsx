import {
  ArrowDown,
  FileText,
  ScrollText,
  Hourglass,
  Disc3,
  Layers,
  Music2,
  ListMusic,
  Sparkles,
} from "lucide-react";
import { Container } from "./container";

const problems = [
  "I bought a piano but don't know where to start.",
  "Sheet music feels overwhelming.",
  "Apps teach songs but not understanding.",
  "I stopped lessons because they weren't inspiring.",
];

const traditional = [
  { icon: FileText, label: "Notes" },
  { icon: ScrollText, label: "Sheet Music" },
  { icon: Hourglass, label: "Years of Practice" },
  { icon: Disc3, label: "One Song" },
];

const pianoOS = [
  { icon: Layers, label: "See the Pattern" },
  { icon: Music2, label: "Play the Chord" },
  { icon: ListMusic, label: "Recognize the Song" },
  { icon: Sparkles, label: "Play Music" },
];

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

          <div className="mt-8 grid overflow-hidden rounded-3xl border border-border/80 md:grid-cols-2">
            <div className="border-b border-border/80 bg-card/40 px-8 py-9 md:border-r md:border-b-0 sm:px-10">
              <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Traditional approach
              </span>
              <div className="mt-6 space-y-5 text-muted-foreground/70">
                {traditional.map(({ icon: Icon, label }, i) => (
                  <div key={label}>
                    {i > 0 && (
                      <ArrowDown className="mb-5 ml-5 h-4 w-4 text-muted-foreground/40" />
                    )}
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/80">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="font-serif text-lg line-through decoration-muted-foreground/40">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 px-8 py-9 sm:px-10">
              <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
                PianoOS approach
              </span>
              <div className="mt-6 space-y-5">
                {pianoOS.map(({ icon: Icon, label }, i) => (
                  <div key={label}>
                    {i > 0 && (
                      <ArrowDown className="mb-5 ml-5 h-4 w-4 text-gold/50" />
                    )}
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-gold">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-serif text-lg text-foreground md:text-xl">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
