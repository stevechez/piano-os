"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FasterBeatInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={110}
      tapsRequired={6}
      prompt="Now try a faster tempo"
      onComplete={onComplete}
    />
  );
}
