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

export function OneStepAwayInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="G major is one step from C on the circle of fifths — and you already transposed your song there in Module 12."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
