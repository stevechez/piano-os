"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const B_DIMINISHED_NOTES = ["B3", "D4", "F4"];

export function BuildingBDiminishedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={B_DIMINISHED_NOTES}
      prompt={(index, total) =>
        index === total
          ? "That's B Diminished — the seventh diatonic chord in C major, and it doesn't sound like the others."
          : `Build the chord starting on B, root to fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
