import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const RECAP = [
  "The keyboard is a repeating pattern, not 88 things to memorize.",
  "You played C Major — one of the most important chords in music.",
  "You played a real chord progression used in thousands of songs.",
];

export default function LearnCompletePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 text-center sm:px-6 md:py-20">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Sparkles className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <h1 className="mt-6 font-serif text-3xl leading-[1.15] font-medium tracking-tight text-balance md:text-4xl">
        You just experienced how musicians think about the piano.
      </h1>
      <p className="mt-4 text-muted-foreground">In a few minutes, you:</p>

      <div className="mt-8 space-y-3 text-left">
        {RECAP.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card/40 p-4"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.25} />
            <span className="text-foreground">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-gold/30 bg-gold/[0.06] p-8">
        <p className="font-serif text-xl text-foreground">
          Would you like to save your progress?
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/signup?redirectTo=/learn"
            className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            Create Free Account
          </Link>
          <Link
            href="/learn"
            className="px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Maybe later — keep exploring
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          No pressure. Your progress is already saved on this device.
        </p>
      </div>
    </div>
  );
}
