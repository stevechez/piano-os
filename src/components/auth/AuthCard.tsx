import Link from "next/link";
import type { ReactNode } from "react";
import { Piano } from "lucide-react";

export interface AuthCardProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({
  eyebrow,
  heading,
  subheading,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-radial-glow bg-grain px-4 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2.5 text-[15px] font-medium tracking-tight text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-gold">
            <Piano className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="font-serif text-lg">PianoOS</span>
        </Link>

        <div className="rounded-3xl border border-border/80 bg-card/40 p-8 backdrop-blur-sm">
          <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-3 font-serif text-2xl leading-[1.2] font-medium tracking-tight text-foreground">
            {heading}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subheading}</p>

          <div className="mt-7">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      </div>
    </div>
  );
}
