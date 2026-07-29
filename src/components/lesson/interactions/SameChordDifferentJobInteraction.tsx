"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function SameChordDifferentJobInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myVerseInG" onComplete={onComplete} />;
}
