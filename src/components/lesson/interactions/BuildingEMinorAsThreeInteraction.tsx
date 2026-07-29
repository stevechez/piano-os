"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const E_MINOR_NOTES = ["E4", "G4", "B4"];

export function BuildingEMinorAsThreeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={E_MINOR_NOTES}
      prompt={(index, total) =>
        index === total
          ? "That's the iii chord — E Minor, understood now as C major's third scale degree."
          : `Build the chord starting on E, root to fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
