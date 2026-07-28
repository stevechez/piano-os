"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

// Same four G7 notes (G, B, D, F) as Module 4's first lesson, reordered --
// exactly the inversion skill from Module 3, applied to a new chord type.
const OPTIONS = [
  { id: "root", label: "Root Position", notes: ["G3", "B3", "D4", "F4"] },
  { id: "first", label: "First Inversion", notes: ["B3", "D4", "F4", "G4"] },
];

export function SeventhInversionsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="You already know how to invert a chord. Try it on G7."
      options={OPTIONS.map((o) => ({
        id: o.id,
        label: o.label,
        play: () => playChord(o.notes),
      }))}
      onComplete={onComplete}
    />
  );
}
