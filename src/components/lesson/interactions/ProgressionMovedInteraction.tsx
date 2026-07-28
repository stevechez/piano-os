"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function ProgressionMovedInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myVerseInG" onComplete={onComplete} />;
}
