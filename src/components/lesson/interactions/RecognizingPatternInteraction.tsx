"use client";

import { ChordProgressionInteraction } from "./ChordProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function RecognizingPatternInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChordProgressionInteraction
      progressionId="classicRock"
      onComplete={onComplete}
    />
  );
}
