"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playPlain() {
  ["C4", "E4", "G4"].forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.45 }), i * 380);
  });
}

function playWithOrnament() {
  window.setTimeout(() => playNote("C4", { duration: 0.45 }), 0);
  window.setTimeout(() => playNote("D4", { duration: 0.12, velocity: 0.2 }), 380);
  window.setTimeout(() => playNote("E4", { duration: 0.45 }), 480);
  window.setTimeout(() => playNote("G4", { duration: 0.45 }), 860);
}

const OPTIONS = [
  { id: "plain", label: "Plain Phrase", play: playPlain },
  { id: "ornament", label: "With an Ornament", play: playWithOrnament },
];

export function AddingAnOrnamentInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="A plain little phrase, then the same phrase with a quick note added for color."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
