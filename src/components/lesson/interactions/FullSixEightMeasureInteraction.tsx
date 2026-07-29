"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FullSixEightMeasureInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={150}
      tapsRequired={12}
      beatsPerMeasure={6}
      prompt="Two full measures of six. Tap along"
      onComplete={onComplete}
    />
  );
}
