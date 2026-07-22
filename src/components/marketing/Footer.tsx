import { Piano } from "lucide-react";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border/80 py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-gold">
                <Piano className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <span className="font-serif text-lg text-foreground">
                PianoOS
              </span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Learn piano through chords, patterns, and the music you love.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PianoOS
          </p>
        </div>
      </Container>
    </footer>
  );
}
