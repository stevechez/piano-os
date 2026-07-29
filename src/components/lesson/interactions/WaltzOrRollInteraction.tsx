"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const BASS = "C3";
const UPPER = C_MAJOR.notes[C_MAJOR.notes.length - 1];

function playWaltzPattern() {
  window.setTimeout(() => playNote(BASS, { duration: 0.3 }), 0);
  window.setTimeout(() => playNote(UPPER, { duration: 0.25, velocity: 0.25 }), 300);
  window.setTimeout(() => playNote(UPPER, { duration: 0.25, velocity: 0.25 }), 600);
}

function playRollPattern() {
  C_MAJOR.notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.3, velocity: 0.28 }), i * 150);
  });
}

const OPTIONS = [
  { id: "waltz", label: "Waltz" },
  { id: "roll", label: "Roll" },
];

const ROUNDS = [
  { play: playWaltzPattern, options: OPTIONS, answerId: "waltz" },
  { play: playRollPattern, options: OPTIONS, answerId: "roll" },
  { play: playRollPattern, options: OPTIONS, answerId: "roll" },
];

export function WaltzOrRollInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Bass-and-stab, or a rolling arpeggio? Listen for the texture."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
