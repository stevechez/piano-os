"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function IiiIntoSixInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="iiiToSix" onComplete={onComplete} />;
}
