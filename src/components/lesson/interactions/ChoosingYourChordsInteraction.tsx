"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD_IDS = ["cMajor", "aMinor", "fMajor", "gMajor"];

const OPTIONS = CHORD_IDS.map((id) => {
  const chord = getChord(id);
  return { id, label: chord.name, play: () => playChord(chord.notes) };
});

export function ChoosingYourChordsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Four chords you already know. Try each one — these are what you'll build your song from."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
