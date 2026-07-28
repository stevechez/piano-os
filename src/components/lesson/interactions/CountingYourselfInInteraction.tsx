"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function CountingYourselfInInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={90}
      tapsRequired={4}
      prompt="Tap a count-in, like you would before starting a song"
      onComplete={onComplete}
    />
  );
}
