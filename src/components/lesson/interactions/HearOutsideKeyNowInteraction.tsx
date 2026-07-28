"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function HearOutsideKeyNowInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="borrowedCapstone" onComplete={onComplete} />;
}
