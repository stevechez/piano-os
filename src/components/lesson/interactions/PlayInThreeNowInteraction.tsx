"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function PlayInThreeNowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={100}
      tapsRequired={9}
      beatsPerMeasure={3}
      prompt="Three full measures, all the way through"
      onComplete={onComplete}
    />
  );
}
