"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const A_MINOR = getChord("aMinor");

const OPTIONS = [
  { id: "c-major", label: "C Major", play: () => playChord(C_MAJOR.notes) },
  { id: "a-minor", label: "A Minor", play: () => playChord(A_MINOR.notes) },
];

export function MajorMinorTwinsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="C Major and A Minor share every single note in their scales. That's not a coincidence."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
