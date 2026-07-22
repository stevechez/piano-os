"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

const CHORD = getChord("cMajor");

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FirstChordInteraction({ onComplete }: LessonInteractionProps) {
  const [played, setPlayed] = useState<Set<string>>(new Set());
  const [heardTogether, setHeardTogether] = useState(false);

  const allNotesPlayed = played.size === CHORD.notes.length;

  const handleNotePlay = (note: string) => {
    if (!CHORD.notes.includes(note) || played.has(note)) return;
    const next = new Set(played);
    next.add(note);
    setPlayed(next);
  };

  const handleHearTogether = () => {
    playChord(CHORD.notes);
    setHeardTogether(true);
    onComplete();
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {allNotesPlayed
          ? "Now hear all three together."
          : `Play C, E, and G again — one at a time (${played.size} of ${CHORD.notes.length}).`}
      </p>

      <PianoKeyboard
        startOctave={3}
        endOctave={5}
        highlightedNotes={CHORD.notes.filter((n) => !played.has(n))}
        activeNotes={Array.from(played)}
        onNotePlay={handleNotePlay}
        showLabels
        labelFilter={(note) => CHORD.notes.includes(note)}
        size="lg"
      />

      <button
        type="button"
        onClick={handleHearTogether}
        disabled={!allNotesPlayed}
        className={cn(
          "rounded-full px-6 py-3 text-sm font-medium transition-all",
          allNotesPlayed
            ? "bg-gold text-gold-foreground hover:scale-[1.02]"
            : "cursor-not-allowed bg-secondary text-muted-foreground"
        )}
      >
        {heardTogether ? "Play it again" : "Hear it as one chord"}
      </button>
    </div>
  );
}
