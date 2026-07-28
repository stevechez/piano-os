"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const OPTIONS = [
  { id: "bunched", label: "Bunched A Minor", play: () => playChord(["A3", "C4", "E4"]) },
  { id: "spread", label: "Spread A Minor", play: () => playChord(["A2", "C4", "E4"]) },
];

export function SpreadingMinorChordInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Try it with a minor chord too. Compare close A Minor to a spread version."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
