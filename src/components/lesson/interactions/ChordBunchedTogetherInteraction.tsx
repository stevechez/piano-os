"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const C_MAJOR_SPREAD = getChord("cMajorSpread");

const OPTIONS = [
  { id: "bunched", label: "Bunched", play: () => playChord(C_MAJOR.notes) },
  { id: "spread", label: "Spread", play: () => playChord(C_MAJOR_SPREAD.notes) },
];

export function ChordBunchedTogetherInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Every chord you've played so far has been bunched together in one hand. Compare that to spreading the same notes out."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
