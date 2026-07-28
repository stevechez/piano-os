"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const F_MAJOR = getChord("fMajor");
const G_MAJOR = getChord("gMajor");
const C_MAJOR = getChord("cMajor");
const A_MINOR = getChord("aMinor");

function playHome(final: ReturnType<typeof getChord>) {
  [F_MAJOR, G_MAJOR, final].forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 750);
  });
}

const OPTIONS = [
  { id: "major", label: "Major Home" },
  { id: "minor", label: "Minor Home" },
];

const ROUNDS = [
  { play: () => playHome(C_MAJOR), options: OPTIONS, answerId: "major" },
  { play: () => playHome(A_MINOR), options: OPTIONS, answerId: "minor" },
];

export function MajorHomeOrMinorHomeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Same F and G leading in. Listen to where it lands — major home, or minor home?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
