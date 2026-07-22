import { Check } from "lucide-react";
import { Container } from "./container";

const guidance = [
  "The chords you've learned",
  "The songs you're working on",
  "Where you need more practice",
];

export function AICoachSection() {
  return (
    <section id="coach" className="py-16 md:py-20">
      <Container>
        <div className="grid gap-8 border-t border-border/80 pt-16 md:grid-cols-2 md:items-start md:gap-16">
          <h2 className="font-serif text-2xl leading-[1.15] font-medium tracking-tight text-balance md:text-3xl">
            Never wonder what to practice next.
          </h2>

          <div>
            <p className="leading-relaxed text-muted-foreground">
              PianoOS remembers where you are and quietly guides your next
              step:
            </p>

            <ul className="mt-5 space-y-3">
              {guidance.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-foreground"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={2}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
