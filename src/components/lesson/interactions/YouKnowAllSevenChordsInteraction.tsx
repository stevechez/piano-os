"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YouKnowAllSevenChordsInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="sevenChordClose" onComplete={onComplete} />;
}
