"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const G_MAJOR = getChord("gMajor");
const E_MINOR = getChord("eMinor");

const OPTIONS = [
  { id: "g-major", label: "G Major", play: () => playChord(G_MAJOR.notes) },
  { id: "e-minor", label: "E Minor", play: () => playChord(E_MINOR.notes) },
];

export function GMajorMinorTwinInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="G major's inner-ring twin is E minor. Compare them."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
