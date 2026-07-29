"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const A_MINOR = getChord("aMinor");
const E_MINOR = getChord("eMinor");

const OPTIONS = [
  { id: "home", label: "C Major (I)", play: () => playChord(C_MAJOR.notes) },
  { id: "vi", label: "A Minor (vi)", play: () => playChord(A_MINOR.notes) },
  { id: "iii", label: "E Minor (iii)", play: () => playChord(E_MINOR.notes) },
];

export function TwoUnderstudiesForHomeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="vi and iii both stand in for home. Compare all three."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
