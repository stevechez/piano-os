"use client";

import { PlayProgressionInteraction } from "./PlayProgressionInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function ASharperEndingForYourSongInteraction({ onComplete }: LessonInteractionProps) {
  return <PlayProgressionInteraction progressionId="myChorusSharpened" onComplete={onComplete} />;
}
