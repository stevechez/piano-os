"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function LeadingToneCadenceInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="leadingToneCadence" onComplete={onComplete} />;
}
