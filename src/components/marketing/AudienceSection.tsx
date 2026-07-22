import { Keyboard, RotateCcw, Guitar, Mic2 } from "lucide-react";
import { Container } from "./container";

const people = [
  {
    icon: Keyboard,
    text: "The adult who bought a keyboard and feels stuck",
  },
  {
    icon: RotateCcw,
    text: "The former piano student starting again",
  },
  {
    icon: Guitar,
    text: "The guitarist who understands chords",
  },
  {
    icon: Mic2,
    text: "The singer-songwriter wanting accompaniment skills",
  },
];

export function AudienceSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <h2 className="max-w-xl font-serif text-3xl leading-[1.15] font-medium tracking-tight whitespace-nowrap md:text-4xl">
          PianoOS was built for people like you.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border/80 bg-border/80 md:grid-cols-2">
          {people.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="group flex items-start gap-5 bg-background px-8 py-9 transition-colors hover:bg-card/60"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-gold transition-colors group-hover:bg-gold/15">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="pt-2 text-lg leading-snug text-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
