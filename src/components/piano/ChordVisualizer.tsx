"use client";

import { PianoKeyboard } from "./PianoKeyboard";
import { parseNote } from "@/lib/music/notes";
import type { Chord } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

export interface ChordVisualizerProps {
  chord: Chord;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Reusable "here's a chord" display: name, note letters, and a compact
 * keyboard with exactly those keys lit up gold. Auto-ranges the keyboard
 * to the chord's own octave span rather than showing a full multi-octave
 * keyboard, so it stays legible at small sizes. See
 * docs/41-piano-component-spec.md.
 */
export function ChordVisualizer({
  chord,
  size = "sm",
  className,
}: ChordVisualizerProps) {
  const octaves = chord.notes.map((note) => parseNote(note).octave);
  const startOctave = Math.min(...octaves);
  const endOctave = Math.max(...octaves) + 1;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg text-foreground">{chord.name}</span>

        <div className="flex gap-1.5">
          {chord.notes.map((note) => (
            <span
              key={note}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-xs text-gold"
            >
              {parseNote(note).pitch}
            </span>
          ))}
        </div>
      </div>

      <PianoKeyboard
        startOctave={startOctave}
        endOctave={endOctave}
        activeNotes={chord.notes}
        size={size}
      />
    </div>
  );
}
