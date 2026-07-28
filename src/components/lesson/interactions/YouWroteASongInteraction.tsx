"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YouWroteASongInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="mySong" onComplete={onComplete} />;
}
