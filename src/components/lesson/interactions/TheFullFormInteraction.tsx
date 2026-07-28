"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function TheFullFormInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="bluesMiddle" onComplete={onComplete} />;
}
