"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD_IDS = ["cMajor", "eMinor", "aMinor", "fMajor", "bDiminished"];

const OPTIONS = CHORD_IDS.map((id) => {
  const chord = getChord(id);
  return { id, label: chord.name, play: () => playChord(chord.notes) };
});

export function ChoosingYourThirdChordsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Five chords you already know — including iii and vii° this time. These are what you'll build your third song from."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
