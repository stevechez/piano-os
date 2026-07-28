"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playSteady() {
  [0, 400, 800, 1200].forEach((offset) => {
    window.setTimeout(() => playNote("C4", { duration: 0.3 }), offset);
  });
}

function playRushed() {
  [0, 380, 720, 1000].forEach((offset) => {
    window.setTimeout(() => playNote("C4", { duration: 0.3 }), offset);
  });
}

const OPTIONS = [
  { id: "steady", label: "Steady" },
  { id: "rushed", label: "Rushed" },
];

const ROUNDS = [
  { play: playSteady, options: OPTIONS, answerId: "steady" },
  { play: playRushed, options: OPTIONS, answerId: "rushed" },
];

export function SteadyOrRushedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Listen to four clicks. Is the tempo steady, or does it rush ahead?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
