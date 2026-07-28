"use client";

import { useEffect, useRef, useState } from "react";
import { playNote } from "@/lib/audio/piano-synth";
import { cn } from "@/lib/utils";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const BPM = 80;
const BEAT_MS = 60000 / BPM;
const TOLERANCE_MS = 180;
const REQUIRED_HITS = 6;

/**
 * A genuinely new mechanic — nothing in the codebase tracked timing before
 * this. A visual + audible metronome (with a soft downbeat accent every 4
 * beats, so counting feels natural rather than mechanical) plays on a
 * fixed interval; the student taps along, and taps landing within a
 * tolerance window of the nearest beat count toward completion. See
 * docs/46-curriculum-authoring-guide.md.
 */
export function RhythmTapInteraction({ onComplete }: LessonInteractionProps) {
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
    }, BEAT_MS);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  const handleTap = () => {
    if (doneRef.current || startRef.current === null) return;

    const elapsed = performance.now() - startRef.current;
    const nearestBeat = Math.round(elapsed / BEAT_MS) * BEAT_MS;
    const diff = Math.abs(elapsed - nearestBeat);

    if (diff > TOLERANCE_MS) return;

    hitsRef.current += 1;
    setHits(hitsRef.current);

    if (hitsRef.current >= REQUIRED_HITS && !doneRef.current) {
      doneRef.current = true;
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Tap along with the beat — {hits} of {REQUIRED_HITS} on time.
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
