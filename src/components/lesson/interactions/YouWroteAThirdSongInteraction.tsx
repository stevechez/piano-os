"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YouWroteAThirdSongInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myThirdSong" onComplete={onComplete} />;
}
