"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["G3", "D4", "D4", "G3", "D4", "D4"];

export function LongerWaltzPatternInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "Same pattern, a different chord — the waltz bass generalizes to any key."
          : `Build the same waltz pattern on G Major this time (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
