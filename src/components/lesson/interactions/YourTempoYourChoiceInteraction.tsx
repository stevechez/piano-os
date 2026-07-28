"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORDS = ["cMajor", "aMinor", "fMajor", "gMajor"].map(getChord);

function playAtGap(gapMs: number) {
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: gapMs / 1000 + 0.2 }), i * gapMs);
  });
}

const OPTIONS = [
  { id: "relaxed", label: "A Relaxed Feel", play: () => playAtGap(900) },
  { id: "driving", label: "A Driving Feel", play: () => playAtGap(500) },
];

export function YourTempoYourChoiceInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Your own progression, at two different tempos. Neither is correct."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
