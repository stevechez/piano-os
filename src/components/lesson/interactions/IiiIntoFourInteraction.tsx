"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function IiiIntoFourInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="iiiToFour" onComplete={onComplete} />;
}
