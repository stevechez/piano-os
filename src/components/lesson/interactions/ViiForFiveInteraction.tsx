"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function ViiForFiveInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="viiForFive" onComplete={onComplete} />;
}
