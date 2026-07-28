"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function VerseIntoBridgeInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myVerseIntoBridge" onComplete={onComplete} />;
}
