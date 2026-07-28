"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const ROOTS = ["C4", "G4", "D4"];

export function FirstFewStepsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={ROOTS}
      prompt={(index, total) =>
        index === total
          ? "C, G, D — each one a fifth above the last. That's the whole circle, one step at a time."
          : `The circle of fifths is built by counting up a fifth, again and again (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
