"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const E_MINOR = getChord("eMinor");
const A_MINOR = getChord("aMinor");

const OPTIONS = [
  { id: "home", label: "Home (I)" },
  { id: "iii", label: "iii" },
  { id: "vi", label: "vi" },
];

const ROUNDS = [
  { play: () => playChord(C_MAJOR.notes), options: OPTIONS, answerId: "home" },
  { play: () => playChord(A_MINOR.notes), options: OPTIONS, answerId: "vi" },
  { play: () => playChord(E_MINOR.notes), options: OPTIONS, answerId: "iii" },
];

export function HomeSoftenedOrNotInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Home, iii, or vi? Listen for the register as much as the quality."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
