"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const C_MINOR = getChord("cMinor");
const B_DIMINISHED = getChord("bDiminished");

const OPTIONS = [
  { id: "major", label: "Major" },
  { id: "minor", label: "Minor" },
  { id: "diminished", label: "Diminished" },
];

const ROUNDS = [
  { play: () => playChord(C_MAJOR.notes), options: OPTIONS, answerId: "major" },
  { play: () => playChord(B_DIMINISHED.notes), options: OPTIONS, answerId: "diminished" },
  { play: () => playChord(C_MINOR.notes), options: OPTIONS, answerId: "minor" },
];

export function DiminishedOrNotInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Major, minor, or diminished? Listen for the instability."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
