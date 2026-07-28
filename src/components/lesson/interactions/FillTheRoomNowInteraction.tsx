"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FillTheRoomNowInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="spreadCadence" onComplete={onComplete} />;
}
