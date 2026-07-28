"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD_IDS = ["aMinor", "fMajor", "dMinor", "eMajor"];

const OPTIONS = CHORD_IDS.map((id) => {
  const chord = getChord(id);
  return { id, label: chord.name, play: () => playChord(chord.notes) };
});

export function ChoosingMinorChordsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Four chords for a different mood this time. Try each one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
