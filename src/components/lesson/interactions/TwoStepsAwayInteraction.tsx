"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");
const D_MAJOR = getChord("dMajor");

function playJourney(middle: ReturnType<typeof getChord>) {
  playChord(C_MAJOR.notes, { duration: 0.8 });
  window.setTimeout(() => playChord(middle.notes, { duration: 0.8 }), 700);
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 0.9 }), 1400);
}

const OPTIONS = [
  { id: "one-step", label: "One Step (C to G)", play: () => playJourney(G_MAJOR) },
  { id: "two-steps", label: "Two Steps (C to D)", play: () => playJourney(D_MAJOR) },
];

export function TwoStepsAwayInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare a one-step neighbor to a two-step neighbor."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
