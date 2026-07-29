"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function SecondaryDominantCadenceInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="secondaryDominantCadence" onComplete={onComplete} />;
}
