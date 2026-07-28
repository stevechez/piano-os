"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const F_MAJOR = getChord("fMajor");
const G_MAJOR = getChord("gMajor");
const C_MAJOR = getChord("cMajor");
const A_MINOR = getChord("aMinor");

function playEnding(final: ReturnType<typeof getChord>) {
  [F_MAJOR, G_MAJOR, final].forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.9 }), i * 750);
  });
}

const OPTIONS = [
  { id: "home", label: "Landing on Home", play: () => playEnding(C_MAJOR) },
  { id: "unexpected", label: "Landing Somewhere Unexpected", play: () => playEnding(A_MINOR) },
];

export function LandingSomewhereUnexpectedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare ending your piece on the expected chord to ending on an unexpected one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
