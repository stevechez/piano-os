"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR_SCALE = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

export function MajorScaleInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={C_MAJOR_SCALE}
      prompt={(index, total) =>
        index === total
          ? "That's a full major scale."
          : `Play the next note in the scale (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
