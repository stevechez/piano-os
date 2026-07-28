"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const F_MAJOR = getChord("fMajor");
const F_MINOR = getChord("fMinor");

const OPTIONS = [
  { id: "diatonic", label: "Diatonic" },
  { id: "borrowed", label: "Borrowed" },
];

const ROUNDS = [
  { play: () => playChord(F_MAJOR.notes), options: OPTIONS, answerId: "diatonic" },
  { play: () => playChord(F_MINOR.notes), options: OPTIONS, answerId: "borrowed" },
];

export function BorrowedOrDiatonicInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="You built these chords in Module 8. Now recognize them without seeing which is which."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
