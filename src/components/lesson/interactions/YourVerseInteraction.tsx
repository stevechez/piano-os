"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YourVerseInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myVerse" onComplete={onComplete} />;
}
