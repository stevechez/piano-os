"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playRun(notes: string[]) {
  notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), i * 280);
  });
}

const OPTIONS = [
  { id: "major", label: "Major" },
  { id: "mixolydian", label: "Mixolydian" },
];

const ROUNDS = [
  { play: () => playRun(["G4", "A4", "B4", "C5"]), options: OPTIONS, answerId: "major" },
  { play: () => playRun(["G4", "A4", "A#4", "C5"]), options: OPTIONS, answerId: "mixolydian" },
];

export function MajorOrMixolydianInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="The one-note difference from Module 9, now tested by ear."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
