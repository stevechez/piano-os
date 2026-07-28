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

export function SameShapeNewStartingPointInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="A major chord is always built the same way — root, third, fifth. Compare C Major to G Major."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
