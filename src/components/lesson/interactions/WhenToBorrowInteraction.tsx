"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const F_MAJOR = getChord("fMajor");
const F_MINOR = getChord("fMinor");
const G_MAJOR = getChord("gMajor");

function playLoop(third: ReturnType<typeof getChord>) {
  [C_MAJOR, F_MAJOR, third, G_MAJOR].forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.7 }), i * 700);
  });
}

const OPTIONS = [
  { id: "all-diatonic", label: "All Diatonic", play: () => playLoop(F_MAJOR) },
  { id: "one-borrowed", label: "One Borrowed Chord", play: () => playLoop(F_MINOR) },
];

export function WhenToBorrowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare a plain progression to the same one with just one chord borrowed."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
