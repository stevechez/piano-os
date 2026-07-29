"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["G3", "B3", "D4", "G3", "B3", "D4"];

export function BuildingALongerRollInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "Same roll, a different chord — it generalizes to any key."
          : `Build the same rolling pattern on G Major this time (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
