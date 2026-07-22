import { BookOpen, ListMusic, Compass } from "lucide-react";
import { Container } from "./container";

const pillars = [
  {
    icon: BookOpen,
    title: "Understand Music",
    detail: "Learn chords, harmony, and patterns.",
  },
  {
    icon: ListMusic,
    title: "Play Songs",
    detail: "Apply concepts to songs you actually love.",
  },
  {
    icon: Compass,
    title: "Become Independent",
    detail: "Learn to create and improvise.",
  },
];

export function MethodSection() {
  return (
    <section id="method" className="py-16 md:py-20">
      <Container>
        <h2 className="font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
          The PianoOS method
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, detail }, i) => (
            <div
              key={title}
              className="rounded-3xl border border-border/80 bg-card/40 p-8 transition-colors hover:bg-card/70"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-gold">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-serif text-sm text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-8 font-serif text-xl text-foreground">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
