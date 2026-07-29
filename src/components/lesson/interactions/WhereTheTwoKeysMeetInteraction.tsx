"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function WhereTheTwoKeysMeetInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myChorusInG" onComplete={onComplete} />;
}
