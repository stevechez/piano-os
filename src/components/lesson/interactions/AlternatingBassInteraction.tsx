"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["C3", "G3", "C3", "G3"];

export function AlternatingBassInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "That's an alternating bass — root, fifth, root, fifth."
          : `Alternate between the root and the fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
