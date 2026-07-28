"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function ThirdSectionBridgeInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myBridge" onComplete={onComplete} />;
}
