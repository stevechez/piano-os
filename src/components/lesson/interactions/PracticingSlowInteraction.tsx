"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const PHRASE = ["C4", "E4", "G4", "C5"];

function playAtSpeed(gapMs: number) {
  PHRASE.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.35 }), i * gapMs);
  });
}

const OPTIONS = [
  { id: "performance", label: "Performance Tempo", play: () => playAtSpeed(220) },
  { id: "practice", label: "Practice Tempo", play: () => playAtSpeed(550) },
];

export function PracticingSlowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same short phrase, at performance speed and at practice speed."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
