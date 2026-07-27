"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";

export interface NoteSequenceInteractionProps {
  /** Notes the student must play, in this exact order. */
  sequence: string[];
  /** Prompt copy, given how far through the sequence the student is. */
  prompt: (index: number, total: number) => string;
  startOctave?: number;
  endOctave?: number;
  onComplete: () => void;
}

/**
 * "Click these specific notes, in this specific order" — the shape shared
 * by scale-building and chord-building lessons (a scale is an ordered walk
 * up the keyboard; a chord is root-third-fifth in that order). Distinct
 * from FindNotesInteraction (any order) and IntervalPairInteraction
 * (anchor then any valid target) — order is the whole point here. See
 * docs/46-curriculum-authoring-guide.md.
 */
export function NoteSequenceInteraction({
  sequence,
  prompt,
  startOctave = 3,
  endOctave = 6,
  onComplete,
}: NoteSequenceInteractionProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNotePlay = (note: string) => {
    if (note !== sequence[stepIndex]) return;

    const next = stepIndex + 1;
    setStepIndex(next);
    if (next === sequence.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {prompt(stepIndex, sequence.length)}
      </p>

      <PianoKeyboard
        startOctave={startOctave}
        endOctave={endOctave}
        highlightedNotes={stepIndex < sequence.length ? [sequence[stepIndex]] : []}
        activeNotes={sequence.slice(0, stepIndex)}
        onNotePlay={handleNotePlay}
        showLabels
        labelFilter={(note) => sequence.includes(note)}
        size="lg"
      />
    </div>
  );
}
