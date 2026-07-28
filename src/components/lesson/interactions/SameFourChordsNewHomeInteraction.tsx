"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const A_MINOR = getChord("aMinor");
const F_MAJOR = getChord("fMajor");
const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");

function playSequence(chords: ReturnType<typeof getChord>[]) {
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

const OPTIONS = [
  { id: "home-is-c", label: "Home Is C", play: () => playSequence([A_MINOR, F_MAJOR, G_MAJOR, C_MAJOR]) },
  { id: "home-is-am", label: "Home Is A Minor", play: () => playSequence([F_MAJOR, G_MAJOR, C_MAJOR, A_MINOR]) },
];

export function SameFourChordsNewHomeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Four chords you already know — Am, F, C, G. Compare which one they land on."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
