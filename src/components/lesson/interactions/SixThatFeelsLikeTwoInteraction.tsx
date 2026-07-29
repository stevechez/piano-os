"use client";

import { TempoTapInteraction } from "./TempoTapInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function SixThatFeelsLikeTwoInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <TempoTapInteraction
      bpm={150}
      tapsRequired={6}
      beatsPerMeasure={6}
      prompt="3/4 counts three. Try tapping along to something that counts six — but listen for how it groups"
      onComplete={onComplete}
    />
  );
}
