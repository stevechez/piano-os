"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const MOTIF = ["C4", "E4", "G4"];

function playSteady() {
  MOTIF.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), i * 400);
  });
}

function playSyncopated() {
  const offsets = [0, 250, 650];
  MOTIF.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), offsets[i]);
  });
}

const OPTIONS = [
  { id: "steady", label: "Steady Rhythm", play: playSteady },
  { id: "syncopated", label: "Syncopated", play: playSyncopated },
];

export function RhythmicVariationInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Same three notes. Compare a steady rhythm to a syncopated one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
