"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function CountingToThreeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={90}
      tapsRequired={3}
      beatsPerMeasure={3}
      prompt="Most of what you've played counts in groups of four. Try counting in groups of three instead"
      onComplete={onComplete}
    />
  );
}
