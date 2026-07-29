"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const D_MAJOR_NOTES = ["D4", "F#4", "A4"];

export function BuildingVOfVInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={D_MAJOR_NOTES}
      prompt={(index, total) =>
        index === total
          ? "That's V/V — the V chord's own V. Same borrowing instinct as Module 8, aimed at a new target."
          : `Build the chord starting on D — major this time, root to fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
