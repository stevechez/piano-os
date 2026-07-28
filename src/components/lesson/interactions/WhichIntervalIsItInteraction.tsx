"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const OPTIONS = [
  { id: "third", label: "Third" },
  { id: "fifth", label: "Fifth" },
];

const ROUNDS = [
  { play: () => playChord(["C4", "E4"], { duration: 1.2 }), options: OPTIONS, answerId: "third" },
  { play: () => playChord(["C4", "G4"], { duration: 1.2 }), options: OPTIONS, answerId: "fifth" },
];

export function WhichIntervalIsItInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="You've built these intervals before. Now recognize them by ear alone."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
