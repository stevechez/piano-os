import { Check, Sparkles } from "lucide-react";
import { ChordVisualizer } from "@/components/piano/ChordVisualizer";
import { UnlockPanel } from "@/components/commerce/UnlockPanel";
import { getChord } from "@/lib/music/chords";

const C_MAJOR = getChord("cMajor");

const RECAP = [
  "The piano is built on patterns.",
  "How to play your first chord.",
  "Why chords unlock thousands of songs.",
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
      <p className="mt-4 text-muted-foreground">You just learned:</p>

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

      <div className="mt-8 rounded-2xl border border-border/80 bg-card/40 p-6 text-left">
        <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Remember this?
        </p>
        <div className="mt-4">
          <ChordVisualizer chord={C_MAJOR} />
        </div>
      </div>

      <UnlockPanel />
    </div>
  );
}
