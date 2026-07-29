"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const C_MINOR = getChord("cMinor");
const B_DIMINISHED = getChord("bDiminished");

const OPTIONS = [
  { id: "major", label: "Major", play: () => playChord(C_MAJOR.notes) },
  { id: "minor", label: "Minor", play: () => playChord(C_MINOR.notes) },
  { id: "diminished", label: "Diminished", play: () => playChord(B_DIMINISHED.notes) },
];

export function MajorMinorDiminishedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Major, minor, and now diminished. All three are built from stacked thirds — listen for what's different."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
