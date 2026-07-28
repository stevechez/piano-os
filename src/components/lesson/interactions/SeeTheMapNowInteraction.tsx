"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function SeeTheMapNowInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="classicPop" onComplete={onComplete} />;
}
