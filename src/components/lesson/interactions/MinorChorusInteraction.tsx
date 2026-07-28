"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function MinorChorusInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myMinorChorus" onComplete={onComplete} />;
}
