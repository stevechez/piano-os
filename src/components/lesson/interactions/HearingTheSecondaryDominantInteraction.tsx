"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const D_MINOR = getChord("dMinor");
const D_MAJOR = getChord("dMajor");

const OPTIONS = [
  { id: "ii", label: "D Minor (ii)" },
  { id: "v-of-v", label: "D Major (V/V)" },
];

const ROUNDS = [
  { play: () => playChord(D_MINOR.notes), options: OPTIONS, answerId: "ii" },
  { play: () => playChord(D_MAJOR.notes), options: OPTIONS, answerId: "v-of-v" },
  { play: () => playChord(D_MAJOR.notes), options: OPTIONS, answerId: "v-of-v" },
];

export function HearingTheSecondaryDominantInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Diatonic ii, or borrowed V/V? Listen for the sharpened third."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
