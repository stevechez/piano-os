"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function KnowTheWholeFamilyNowInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="fullDiatonicFamily" onComplete={onComplete} />;
}
