"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const C_MAJOR_SPREAD = getChord("cMajorSpread");

const OPTIONS = [
  { id: "close", label: "Close" },
  { id: "spread", label: "Spread" },
];

const ROUNDS = [
  { play: () => playChord(C_MAJOR.notes), options: OPTIONS, answerId: "close" },
  { play: () => playChord(C_MAJOR_SPREAD.notes), options: OPTIONS, answerId: "spread" },
];

export function SpreadVoicingByEarInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Listen and decide: is this chord close together or spread out?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
