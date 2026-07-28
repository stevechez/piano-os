"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const PHRASE = ["E4", "G4", "E4", "C4"];

export function CallAndResponseInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={PHRASE}
      prompt={(index, total) =>
        index === total
          ? "That's call and response — listening, then answering."
          : `Play the phrase back, exactly as you heard it (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
