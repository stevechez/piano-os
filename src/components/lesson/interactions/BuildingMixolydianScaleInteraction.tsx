"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const MIXOLYDIAN_SCALE = ["C4", "D4", "E4", "F4", "G4", "A4", "A#4", "C5"];

export function BuildingMixolydianScaleInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={MIXOLYDIAN_SCALE}
      prompt={(index, total) =>
        index === total
          ? "Same shape as a major scale, except the 7th step is a half-step lower."
          : `Build the Mixolydian scale, root to octave (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
