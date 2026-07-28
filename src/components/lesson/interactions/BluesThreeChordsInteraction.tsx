"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD_IDS = ["c7", "f7", "g7"];

const OPTIONS = CHORD_IDS.map((id) => {
  const chord = getChord(id);
  return { id, label: chord.name, play: () => playChord(chord.notes) };
});

export function BluesThreeChordsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The blues is built from dominant seventh versions of three chords you already know: C, F, and G. Try each one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
