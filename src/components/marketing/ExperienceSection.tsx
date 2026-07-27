import { Lightbulb, Repeat, Play } from "lucide-react";
import { Container } from "./container";

const steps = [
  {
    icon: Lightbulb,
    label: "Understand",
    detail: "Learn the concept behind the music.",
  },
  {
    icon: Repeat,
    label: "Practice",
    detail: "Build the pattern into your hands.",
  },
  {
    icon: Play,
    label: "Play",
    detail: "Apply it to a real song you love.",
  },
];

export function ExperienceSection() {
  return (
    <section id="songs" className="py-16 md:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-serif text-3xl leading-[1.15] font-medium tracking-tight text-balance md:text-4xl">
            Learn by playing music you love.
          </h2>

          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:justify-self-end">
            Every lesson connects a concept to a real song, so you
            understand why it works.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <div className="absolute top-6 right-[16.6%] left-[16.6%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map(({ icon: Icon, label, detail }, i) => (
            <div key={label} className="relative flex flex-col items-start">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-gold">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="mt-6 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Step 0{i + 1}
              </span>
              <h3 className="mt-2 font-serif text-2xl text-foreground">
                {label}
              </h3>
              <p className="mt-2 text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
