"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playChords(chords: ReturnType<typeof getChord>[]) {
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

const BUNCHED = ["fMajor", "gMajor", "cMajor"].map(getChord);
const SPREAD = ["fMajorSpread", "gMajorSpread", "cMajorSpread"].map(getChord);

const OPTIONS = [
  { id: "bunched", label: "Bunched Chorus", play: () => playChords(BUNCHED) },
  { id: "spread", label: "Spread Chorus", play: () => playChords(SPREAD) },
];

export function SpreadingOwnChorusInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Your own chorus from Module 7 — bunched, then spread."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
