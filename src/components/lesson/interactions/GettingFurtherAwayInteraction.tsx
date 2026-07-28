"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");
const A_MAJOR = getChord("aMajor");

function playJourney(middle: ReturnType<typeof getChord>) {
  playChord(C_MAJOR.notes, { duration: 0.8 });
  window.setTimeout(() => playChord(middle.notes, { duration: 0.8 }), 700);
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 0.9 }), 1400);
}

const OPTIONS = [
  { id: "one-step", label: "One Step (C to G)", play: () => playJourney(G_MAJOR) },
  { id: "three-steps", label: "Three Steps (C to A)", play: () => playJourney(A_MAJOR) },
];

export function GettingFurtherAwayInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Now compare C's close neighbor to one much further around the circle."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
