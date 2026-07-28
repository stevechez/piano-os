"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YourChorusInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myChorus" onComplete={onComplete} />;
}
