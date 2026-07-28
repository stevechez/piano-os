"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playClicks(count: number) {
  for (let i = 0; i < count * 2; i++) {
    const isDownbeat = i % count === 0;
    window.setTimeout(() => {
      playNote(isDownbeat ? "A5" : "E5", { duration: 0.12, velocity: isDownbeat ? 0.3 : 0.18 });
    }, i * 400);
  }
}

const OPTIONS = [
  { id: "three", label: "Counted in Three" },
  { id: "four", label: "Counted in Four" },
];

const ROUNDS = [
  { play: () => playClicks(3), options: OPTIONS, answerId: "three" },
  { play: () => playClicks(4), options: OPTIONS, answerId: "four" },
];

export function ThreeOrFourInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Listen to the accents. Is this counted in three, or in four?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
