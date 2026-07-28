"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function SongInNewKeyInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myFullSongInG" onComplete={onComplete} />;
}
