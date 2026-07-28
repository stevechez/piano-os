"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const G_MAJOR = getChord("gMajor");
const F_MINOR = getChord("fMinor");

const OPTIONS = [
  { id: "major-side", label: "Major Side (G Major)", play: () => playChord(G_MAJOR.notes) },
  { id: "minor-side", label: "Borrowed Side (F Minor)", play: () => playChord(F_MINOR.notes) },
];

export function BorrowedOnCircleInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare a step on the major side of the circle to a step on the borrowed minor side."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
