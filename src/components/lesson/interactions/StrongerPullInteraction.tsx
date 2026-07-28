"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const A_MINOR = getChord("aMinor");
const E_MINOR = getChord("eMinor");
const E_MAJOR = getChord("eMajor");

function playEnding(five: ReturnType<typeof getChord>) {
  playChord(five.notes, { duration: 0.8 });
  window.setTimeout(() => playChord(A_MINOR.notes, { duration: 1.3 }), 750);
}

const OPTIONS = [
  { id: "soft", label: "Soft Ending", play: () => playEnding(E_MINOR) },
  { id: "stronger", label: "Stronger Ending", play: () => playEnding(E_MAJOR) },
];

export function StrongerPullInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare ending on the natural five chord to ending on its major twin."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
