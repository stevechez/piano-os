"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function WroteSecondSongInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myMinorSong" onComplete={onComplete} />;
}
