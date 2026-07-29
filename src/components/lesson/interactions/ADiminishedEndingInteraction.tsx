"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const B_DIMINISHED = getChord("bDiminished");

function playPlainEnding() {
  playChord(C_MAJOR.notes, { duration: 1.6, velocity: 0.5 });
}

function playDiminishedTurn() {
  playChord(B_DIMINISHED.notes, { duration: 0.7, velocity: 0.4 });
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 1.4, velocity: 0.5 }), 650);
}

const OPTIONS = [
  { id: "plain", label: "Plain Ending", play: playPlainEnding },
  { id: "diminished-turn", label: "Lean Through B° First", play: playDiminishedTurn },
];

export function ADiminishedEndingInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Every song needs an ending. Compare landing on C directly to leaning through B° first."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
