"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const B_MINOR_NOTES = ["B3", "D4", "F#4"];

export function BuildingBMinorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={B_MINOR_NOTES}
      prompt={(index, total) =>
        index === total
          ? "Same minor-triad formula as always — just starting on B this time."
          : `Build B Minor yourself, root to fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
