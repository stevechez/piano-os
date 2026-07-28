"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function MixolydianVampInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="mixolydianVamp" onComplete={onComplete} />;
}
