"use client";

import { useMemo, useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { generateNoteRange, notesOfPitchClass } from "@/lib/music/notes";

const START_OCTAVE = 3;
const END_OCTAVE = 6;

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function PatternMachineInteraction({ onComplete }: LessonInteractionProps) {
  const [found, setFound] = useState<Set<string>>(new Set());

  const targetNotes = useMemo(
    () => notesOfPitchClass(generateNoteRange(START_OCTAVE, END_OCTAVE), "C"),
    []
  );

  const handleNotePlay = (note: string) => {
    if (!targetNotes.includes(note) || found.has(note)) return;

    const next = new Set(found);
    next.add(note);
    setFound(next);

    if (next.size === targetNotes.length) {
      onComplete();
    }
  };

  const remaining = targetNotes.filter((n) => !found.has(n));

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Every C on the keyboard is the same idea, repeated. Find all{" "}
        {targetNotes.length} of them ({found.size} of {targetNotes.length} found).
      </p>

      <PianoKeyboard
        startOctave={START_OCTAVE}
        endOctave={END_OCTAVE}
        highlightedNotes={remaining}
        activeNotes={Array.from(found)}
        onNotePlay={handleNotePlay}
        showLabels
        labelFilter={(note) => targetNotes.includes(note)}
        size="lg"
      />
    </div>
  );
}
