"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const INTERVAL_OPTIONS = [
  { id: "third", label: "Third" },
  { id: "fifth", label: "Fifth" },
];

const CHORD_OPTIONS = [
  { id: "diatonic", label: "Diatonic" },
  { id: "borrowed", label: "Borrowed" },
];

const SCALE_OPTIONS = [
  { id: "major", label: "Major" },
  { id: "mixolydian", label: "Mixolydian" },
];

function playRun(notes: string[]) {
  notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), i * 280);
  });
}

const ROUNDS = [
  {
    play: () => playChord(["C4", "G4"], { duration: 1.2 }),
    options: INTERVAL_OPTIONS,
    answerId: "fifth",
  },
  {
    play: () => playChord(getChord("fMinor").notes),
    options: CHORD_OPTIONS,
    answerId: "borrowed",
  },
  {
    play: () => playRun(["G4", "A4", "A#4", "C5"]),
    options: SCALE_OPTIONS,
    answerId: "mixolydian",
  },
];

export function YouCanHearItNowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="One more round of each: an interval, a chord, a scale. Everything you've trained your ear on."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
