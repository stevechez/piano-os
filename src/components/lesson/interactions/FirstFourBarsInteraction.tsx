"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FirstFourBarsInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="bluesOpening" onComplete={onComplete} />;
}
