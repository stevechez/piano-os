"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const D_MAJOR = getChord("dMajor");
const B_MINOR = getChord("bMinor");

const OPTIONS = [
  { id: "d-major", label: "D Major", play: () => playChord(D_MAJOR.notes) },
  { id: "b-minor", label: "B Minor", play: () => playChord(B_MINOR.notes) },
];

export function DMajorMinorTwinInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="One more pair: D major's inner-ring twin is B minor."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
