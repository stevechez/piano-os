"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["C4", "E4", "G4", "C4", "E4", "G4"];

export function ARollingBassPatternInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "That roll is 6/8's signature move — where the waltz stabs, 6/8 flows."
          : `Build a rolling arpeggio, up through the chord, twice (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
