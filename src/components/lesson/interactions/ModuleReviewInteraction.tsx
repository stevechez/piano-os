"use client";

import { ChordProgressionInteraction } from "./ChordProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function ModuleReviewInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChordProgressionInteraction
      progressionId="classicRock"
      promptLabel="One more time, for the record:"
      onComplete={onComplete}
    />
  );
}
