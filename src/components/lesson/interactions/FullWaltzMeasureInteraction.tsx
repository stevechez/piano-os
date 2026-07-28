"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FullWaltzMeasureInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={110}
      tapsRequired={6}
      beatsPerMeasure={3}
      prompt="Two full measures of three. Tap along"
      onComplete={onComplete}
    />
  );
}
