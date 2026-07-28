"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playStraight() {
  [0, 300, 600, 900].forEach((offset) => {
    window.setTimeout(() => playNote("C4", { duration: 0.25 }), offset);
  });
}

function playShuffle() {
  [0, 200, 600, 800].forEach((offset) => {
    window.setTimeout(() => playNote("C4", { duration: 0.25 }), offset);
  });
}

const OPTIONS = [
  { id: "straight", label: "Straight" },
  { id: "shuffle", label: "Shuffle" },
];

const ROUNDS = [
  { play: playStraight, options: OPTIONS, answerId: "straight" },
  { play: playShuffle, options: OPTIONS, answerId: "shuffle" },
];

export function BluesShuffleInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="The blues has its own rhythmic feel too — the shuffle. Listen and decide."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
