"use client";

import { useState } from "react";
import { ChordVisualizer } from "@/components/piano/ChordVisualizer";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("cMajor");
const SOFT_VELOCITY = 0.12;
const LOUD_VELOCITY = 0.55;

/**
 * A mouse click can't carry real touch velocity — true expressive playing
 * waits for MIDI hardware input (see CLAUDE.md "Future Capabilities"). This
 * teaches the concept honestly instead: the exact same chord, triggered at
 * two different gain levels, so the difference is heard rather than
 * claimed. See docs/46-curriculum-authoring-guide.md.
 */
export function DynamicsInteraction({ onComplete }: LessonInteractionProps) {
  const [playedSoft, setPlayedSoft] = useState(false);
  const [playedLoud, setPlayedLoud] = useState(false);
  const [done, setDone] = useState(false);

  const checkDone = (soft: boolean, loud: boolean) => {
    if (soft && loud && !done) {
      setDone(true);
      onComplete();
    }
  };

  const handleSoft = () => {
    playChord(CHORD.notes, { velocity: SOFT_VELOCITY });
    setPlayedSoft(true);
    checkDone(true, playedLoud);
  };

  const handleLoud = () => {
    playChord(CHORD.notes, { velocity: LOUD_VELOCITY });
    setPlayedLoud(true);
    checkDone(playedSoft, true);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        The exact same three notes. Play them once softly, then once loudly.
      </p>

      <ChordVisualizer chord={CHORD} />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSoft}
          className={cn(
            "rounded-full border px-6 py-3 text-sm font-medium transition-all",
            playedSoft
              ? "border-gold/40 bg-gold/10 text-muted-foreground"
              : "border-gold bg-gold/15 text-foreground hover:scale-[1.02]"
          )}
        >
          Play Softly
        </button>
        <button
          type="button"
          onClick={handleLoud}
          className={cn(
            "rounded-full border px-6 py-3 text-sm font-medium transition-all",
            playedLoud
              ? "border-gold/40 bg-gold/10 text-muted-foreground"
              : "border-gold bg-gold/15 text-foreground hover:scale-[1.02]"
          )}
        >
          Play Loudly
        </button>
      </div>
    </div>
  );
}
