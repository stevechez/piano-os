"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const D_MAJOR = getChord("dMajor");
const D_MINOR = getChord("dMinor");

const OPTIONS = [
  { id: "d-major", label: "D Major", play: () => playChord(D_MAJOR.notes) },
  { id: "d-minor", label: "D Minor", play: () => playChord(D_MINOR.notes) },
];

export function MinorIvChordInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Every key has its own iv chord. Compare D Major to D Minor — only one belongs here."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
