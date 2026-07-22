import Link from "next/link";
import { Container } from "./container";

export function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/40 px-8 py-20 text-center bg-radial-glow">
          <h2 className="mx-auto max-w-xl font-serif text-4xl leading-[1.15] font-medium tracking-tight text-balance md:text-5xl">
            Ready to finally understand piano?
          </h2>

          <Link
            href="/learn"
            className="mt-9 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-gold-foreground shadow-[0_8px_30px_-8px] shadow-gold/40 transition-transform hover:scale-[1.02]"
          >
            Begin Your Journey
          </Link>
        </div>
      </Container>
    </section>
  );
}
