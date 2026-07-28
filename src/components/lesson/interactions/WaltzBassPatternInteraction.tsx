"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["C3", "G4", "G4", "C3", "G4", "G4"];

export function WaltzBassPatternInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "Bass, then two chord hits — that pattern practically invented the waltz."
          : `Build the classic 'oom-pah-pah' waltz bass pattern (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
