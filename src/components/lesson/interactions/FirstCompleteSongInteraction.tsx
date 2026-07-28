"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FirstCompleteSongInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <PlayProgressionInteraction
      progressionId="classicRock"
      onComplete={onComplete}
    />
  );
}
