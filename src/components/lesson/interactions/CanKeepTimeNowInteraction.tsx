"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function CanKeepTimeNowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={100}
      tapsRequired={10}
      prompt="One more time, all the way through"
      onComplete={onComplete}
    />
  );
}
