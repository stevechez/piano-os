"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playSteady() {
  [0, 400, 800, 1200].forEach((offset) => {
    window.setTimeout(() => playNote("C3", { duration: 0.35 }), offset);
  });
}

function playSyncopated() {
  [0, 300, 700, 1050].forEach((offset) => {
    window.setTimeout(() => playNote("C3", { duration: 0.35 }), offset);
  });
}

const OPTIONS = [
  { id: "steady", label: "Steady" },
  { id: "syncopated", label: "Syncopated" },
];

const ROUNDS = [
  { play: playSteady, options: OPTIONS, answerId: "steady" },
  { play: playSyncopated, options: OPTIONS, answerId: "syncopated" },
];

export function SteadyOrSyncopatedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Same note, four times. Is the rhythm steady or syncopated?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
