"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const A_MINOR = getChord("aMinor");
const F_MAJOR = getChord("fMajor");
const F_MINOR = getChord("fMinor");
const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");

function playBridge(second: ReturnType<typeof getChord>) {
  [A_MINOR, second, C_MAJOR, G_MAJOR].forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.7 }), i * 700);
  });
}

const OPTIONS = [
  { id: "diatonic", label: "Diatonic Bridge", play: () => playBridge(F_MAJOR) },
  { id: "borrowed", label: "Borrowed Bridge", play: () => playBridge(F_MINOR) },
];

export function ColorForBridgeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The bridge can borrow color too. Compare the plain bridge to one with a borrowed chord."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
