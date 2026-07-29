"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YouCanChangeKeysNowInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="mySongWithKeyChange" onComplete={onComplete} />;
}
