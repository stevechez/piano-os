"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function SteadierBeatInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={60}
      tapsRequired={4}
      prompt="Tap along with a steady, slow beat"
      onComplete={onComplete}
    />
  );
}
