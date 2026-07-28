"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const A_MINOR = getChord("aMinor");
const F_MAJOR = getChord("fMajor");
const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");

function playArranged(order: ReturnType<typeof getChord>[]) {
  order.forEach((chord, i) => {
    const bassNote = chord.notes[0];
    window.setTimeout(() => playNote(bassNote, { duration: 0.3 }), i * 700);
    window.setTimeout(() => playChord(chord.notes, { duration: 0.4 }), i * 700 + 350);
  });
}

const OPTIONS = [
  { id: "in-c", label: "Arrange It In C", play: () => playArranged([A_MINOR, F_MAJOR, G_MAJOR, C_MAJOR]) },
  { id: "in-am", label: "Arrange It In A Minor", play: () => playArranged([F_MAJOR, G_MAJOR, C_MAJOR, A_MINOR]) },
];

export function ChoosingYourHomeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same four chords, arranged fully, with two different homes."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
