"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");

const OPTIONS = [
  { id: "c-major", label: "C Major", play: () => playChord(C_MAJOR.notes) },
  { id: "g-major", label: "G Major", play: () => playChord(G_MAJOR.notes) },
];

export function OneKeyAwayInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="C and G — one step apart on the circle you mapped in Module 21. Compare them."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
