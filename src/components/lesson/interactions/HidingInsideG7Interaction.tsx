"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const G7 = getChord("g7");
const B_DIMINISHED = getChord("bDiminished");

const OPTIONS = [
  { id: "g7", label: "G7", play: () => playChord(G7.notes) },
  { id: "bdim", label: "B Diminished", play: () => playChord(B_DIMINISHED.notes) },
];

export function HidingInsideG7Interaction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Play G7, then play just B Diminished. Listen for what they share."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
