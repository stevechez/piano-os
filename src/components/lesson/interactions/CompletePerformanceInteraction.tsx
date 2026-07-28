"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function CompletePerformanceInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myCompletePiece" onComplete={onComplete} />;
}
