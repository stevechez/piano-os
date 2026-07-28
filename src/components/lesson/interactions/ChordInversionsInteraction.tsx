"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

// Same three notes (C, E, G) as C Major -- just reordered across octaves.
const OPTIONS = [
  { id: "root", label: "Root Position", notes: ["C4", "E4", "G4"] },
  { id: "first", label: "First Inversion", notes: ["E4", "G4", "C5"] },
  { id: "second", label: "Second Inversion", notes: ["G4", "C5", "E5"] },
];

export function ChordInversionsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Same three notes, rearranged. Try all three — notice they're all still C Major."
      options={OPTIONS.map((o) => ({
        id: o.id,
        label: o.label,
        play: () => playChord(o.notes),
      }))}
      onComplete={onComplete}
    />
  );
}
