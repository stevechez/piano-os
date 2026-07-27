"use client";

import { IntervalPairInteraction } from "./IntervalPairInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FifthPairInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <IntervalPairInteraction
      semitones={7}
      promptBeforeAnchor="Click any note to start."
      promptAfterAnchor="Now find the note a fifth away — the same distance as C to G."
      promptDone="That's a fifth — the backbone of the progression you already know."
      onComplete={onComplete}
    />
  );
}
