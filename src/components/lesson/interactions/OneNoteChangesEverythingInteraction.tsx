"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playScale(notes: string[]) {
  notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), i * 280);
  });
}

const MAJOR_SCALE = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const MIXOLYDIAN_SCALE = ["C4", "D4", "E4", "F4", "G4", "A4", "A#4", "C5"];

const OPTIONS = [
  { id: "major", label: "Major Scale", play: () => playScale(MAJOR_SCALE) },
  { id: "mixolydian", label: "Mixolydian Scale", play: () => playScale(MIXOLYDIAN_SCALE) },
];

export function OneNoteChangesEverythingInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Scales aren't just major or minor. Compare a major scale to a Mixolydian scale — listen for what's different."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
