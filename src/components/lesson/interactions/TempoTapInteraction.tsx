"use client";

import { useEffect, useRef, useState } from "react";
import { playNote } from "@/lib/audio/piano-synth";
import { cn } from "@/lib/utils";

export interface TempoTapInteractionProps {
  bpm: number;
  tapsRequired: number;
  prompt: string;
  onComplete: () => void;
}

const TOLERANCE_MS = 180;

/**
 * Generalizes the exact mechanic Module 2's bespoke RhythmTapInteraction
 * already used once at a fixed 80 BPM / 6 taps: a metronome (with a soft
 * downbeat accent every 4 beats) plays on a fixed interval, and the
 * student taps along -- only taps landing within a tolerance window of
 * the nearest beat count, with no penalty for a miss. Module 17 needs
 * this shape at several different tempos and tap counts, past the
 * genuine-second-repetition threshold this codebase extracts a shared
 * primitive at. RhythmTapInteraction itself is left untouched rather
 * than refactored onto this primitive -- it already works, and wasn't
 * asked to change. See docs/46-curriculum-authoring-guide.md.
 */
export function TempoTapInteraction({ bpm, tapsRequired, prompt, onComplete }: TempoTapInteractionProps) {
  const beatMs = 60000 / bpm;
  const [hits, setHits] = useState(0);
  const [pulsing, setPulsing] = useState(false);
  const [beatInMeasure, setBeatInMeasure] = useState(0);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const hitsRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();
    let beatCount = 0;

    intervalRef.current = window.setInterval(() => {
      const isDownbeat = beatCount % 4 === 0;
      playNote(isDownbeat ? "A5" : "E5", {
        duration: 0.12,
        velocity: isDownbeat ? 0.3 : 0.18,
      });
      setBeatInMeasure(beatCount % 4);
      setPulsing(true);
      window.setTimeout(() => setPulsing(false), 140);
      beatCount += 1;
    }, beatMs);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beatMs]);

  const handleTap = () => {
    if (doneRef.current || startRef.current === null) return;

    const elapsed = performance.now() - startRef.current;
    const nearestBeat = Math.round(elapsed / beatMs) * beatMs;
    const diff = Math.abs(elapsed - nearestBeat);

    if (diff > TOLERANCE_MS) return;

    hitsRef.current += 1;
    setHits(hitsRef.current);

    if (hitsRef.current >= tapsRequired && !doneRef.current) {
      doneRef.current = true;
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {prompt} — {hits} of {tapsRequired} on time.
      </p>

      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border/80 bg-secondary/20 py-10">
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === beatInMeasure ? "bg-gold" : "bg-border"
              )}
            />
          ))}
        </div>

        <span
          className={cn(
            "flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-gold/10 transition-transform duration-100",
            pulsing && "scale-110 bg-gold/30"
          )}
        />

        <button
          type="button"
          onClick={handleTap}
          className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02] active:scale-95"
        >
          Tap
        </button>
      </div>
    </div>
  );
}
