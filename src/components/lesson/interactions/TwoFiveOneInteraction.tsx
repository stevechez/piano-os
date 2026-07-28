"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function TwoFiveOneInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <PlayProgressionInteraction
      progressionId="twoFiveOne"
      onComplete={onComplete}
    />
  );
}
