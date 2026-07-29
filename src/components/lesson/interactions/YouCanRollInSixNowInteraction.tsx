"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function YouCanRollInSixNowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={150}
      tapsRequired={18}
      beatsPerMeasure={6}
      prompt="Three full measures, all the way through"
      onComplete={onComplete}
    />
  );
}
