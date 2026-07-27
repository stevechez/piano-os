"use client";

import { IntervalPairInteraction } from "./IntervalPairInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function OctavePairInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <IntervalPairInteraction
      semitones={12}
      promptBeforeAnchor="Click any note on the keyboard to start."
      promptAfterAnchor="Now find that same note again, one octave up or down."
      promptDone="That's an octave — the same note, twice."
      onComplete={onComplete}
    />
  );
}
