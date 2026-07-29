"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YourThirdVerseInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myThirdVerse" onComplete={onComplete} />;
}
