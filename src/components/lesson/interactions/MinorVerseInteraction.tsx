"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function MinorVerseInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myMinorVerse" onComplete={onComplete} />;
}
