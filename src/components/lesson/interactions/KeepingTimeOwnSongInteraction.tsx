"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function KeepingTimeOwnSongInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={100}
      tapsRequired={8}
      prompt="Keep time the way you would through your own song from Module 7"
      onComplete={onComplete}
    />
  );
}
