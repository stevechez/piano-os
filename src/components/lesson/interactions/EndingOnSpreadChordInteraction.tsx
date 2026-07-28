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
const C_MAJOR_SPREAD = getChord("cMajorSpread");

function playEnding(final: ReturnType<typeof getChord>) {
  [F_MAJOR, G_MAJOR].forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.7 }), i * 700);
  });
  window.setTimeout(() => playChord(final.notes, { duration: 1.4 }), 1400);
}

const OPTIONS = [
  { id: "close", label: "Close Ending", play: () => playEnding(C_MAJOR) },
  { id: "spread", label: "Spread Ending", play: () => playEnding(C_MAJOR_SPREAD) },
];

export function EndingOnSpreadChordInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare finishing on a close final chord to finishing on a spread one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
