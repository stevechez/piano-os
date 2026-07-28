"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

export interface ChordChartInteractionProps {
  /** Chord ids, in the order they appear on the chart. */
  chart: string[];
  onComplete: () => void;
}

const ADVANCE_DELAY_MS = 500;

/**
 * A written chord chart -- just chord names, in order, no staff and no
 * individual notes marked -- the way musicians actually write songs
 * down. Unlike PlayProgressionInteraction, the keyboard gives no visual
 * hint about which notes to press: recalling each chord from its name is
 * the entire point. Genuinely new mechanic for Module 15 -- see
 * docs/46-curriculum-authoring-guide.md.
 */
export function ChordChartInteraction({ chart, onComplete }: ChordChartInteractionProps) {
  const chords = chart.map(getChord);
  const [chordIndex, setChordIndex] = useState(0);
  const [playedInChord, setPlayedInChord] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const currentChord = chords[chordIndex];

  const handleNotePlay = (note: string) => {
    if (done || !currentChord.notes.includes(note) || playedInChord.has(note)) {
      return;
    }

    const next = new Set(playedInChord);
    next.add(note);
    setPlayedInChord(next);

    if (next.size !== currentChord.notes.length) return;

    playChord(currentChord.notes);

    if (chordIndex === chords.length - 1) {
      setDone(true);
      onComplete();
    } else {
      window.setTimeout(() => {
        setChordIndex((i) => i + 1);
        setPlayedInChord(new Set());
      }, ADVANCE_DELAY_MS);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/80 bg-card/40 p-5">
        {chords.map((chord, i) => (
          <span
            key={i}
            className={cn(
              "rounded-lg px-3 py-1.5 font-serif text-lg",
              i === chordIndex && !done
                ? "bg-gold/15 text-gold"
                : i < chordIndex || done
                  ? "text-muted-foreground/50 line-through"
                  : "text-foreground"
            )}
          >
            {chord.name}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {done
          ? "Chart complete."
          : "Read the chart. Play the highlighted chord from memory — no keyboard hints this time."}
      </p>

      <PianoKeyboard
        startOctave={3}
        endOctave={5}
        activeNotes={done ? currentChord.notes : Array.from(playedInChord)}
        onNotePlay={handleNotePlay}
        size="lg"
      />
    </div>
  );
}
