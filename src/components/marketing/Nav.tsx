import Link from "next/link";
import { Piano } from "lucide-react";
import { Container } from "./container";

const links = [
  { href: "#method", label: "Method" },
  { href: "#songs", label: "Songs" },
  { href: "#coach", label: "Practice" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-md">
      <Container>
        <div className="flex h-18 items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-gold">
              <Piano className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-lg">PianoOS</span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              Sign In
            </Link>

            <Link
              href="/learn"
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground transition-opacity hover:opacity-90"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
