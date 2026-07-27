import Link from "next/link";
import { Layers, Music2, ListMusic, Sparkles } from "lucide-react";
import { Container } from "./container";

const flow = [
  { label: "Patterns", icon: Layers },
  { label: "Chords", icon: Music2 },
  { label: "Songs", icon: ListMusic },
  { label: "Creativity", icon: Sparkles },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-glow bg-grain">
      <Container className="relative py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              A new way to learn piano
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[1.08] font-medium tracking-tight text-balance md:text-6xl lg:text-7xl">
              Learn piano
              <br />
              like a musician.
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
              Stop memorizing notes. Start understanding the chords and
              patterns behind the songs you love.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/learn"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-gold-foreground shadow-[0_8px_30px_-8px] shadow-gold/40 transition-transform hover:scale-[1.02]"
              >
                Start Learning Free
              </Link>

              <button className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground">
                See how it works
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl border border-border/80 bg-card/60 p-9 backdrop-blur-sm">
            <div className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              See music differently
            </div>

            <div className="relative mt-10 space-y-8 pl-2">
              <div className="absolute top-2 bottom-2 left-[23px] w-px bg-gradient-to-b from-gold/60 via-border to-transparent" />

              {flow.map(({ label, icon: Icon }, i) => (
                <div key={label} className="relative flex items-center gap-5">
                  <span
                    className={
                      "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border " +
                      (i === flow.length - 1
                        ? "border-gold/50 bg-gold/15 text-gold"
                        : "border-border bg-secondary text-muted-foreground")
                    }
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-xl text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
