"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("cMinor");

export function PracticeCMinorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "C Minor. Every chord follows one of these two formulas."
          : `Build C Minor yourself: root, lowered third, fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
