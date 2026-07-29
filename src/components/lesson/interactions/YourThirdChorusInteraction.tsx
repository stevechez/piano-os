"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YourThirdChorusInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myThirdChorus" onComplete={onComplete} />;
}
