"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function BorrowingInProgressionInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="borrowedTurn" onComplete={onComplete} />;
}
