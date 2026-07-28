"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const OPTIONS = [
  { id: "fifth", label: "Fifth" },
  { id: "octave", label: "Octave" },
];

const ROUNDS = [
  { play: () => playChord(["C4", "G4"], { duration: 1.2 }), options: OPTIONS, answerId: "fifth" },
  { play: () => playChord(["C4", "C5"], { duration: 1.2 }), options: OPTIONS, answerId: "octave" },
];

export function WiderIntervalsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Two wider intervals. Listen for the difference between a fifth and a full octave."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
