"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const C_MINOR = getChord("cMinor");

const OPTIONS = [
  { id: "c-major", label: "C Major", play: () => playChord(C_MAJOR.notes) },
  { id: "c-minor", label: "C Minor", play: () => playChord(C_MINOR.notes) },
];

export function BorrowedChordTransposedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The borrowed-chord trick from Module 8 works in any key. Compare the diatonic IV in G to its borrowed minor twin."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
