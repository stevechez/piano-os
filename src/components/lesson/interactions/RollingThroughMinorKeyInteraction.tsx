"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORDS = ["dMinor", "eMajor", "aMinor"].map(getChord);

function playStraight() {
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

function playRolled() {
  CHORDS.forEach((chord, i) => {
    const start = i * 900;
    chord.notes.forEach((note, j) => {
      window.setTimeout(() => playNote(note, { duration: 0.3, velocity: 0.28 }), start + j * 150);
    });
    chord.notes.forEach((note, j) => {
      window.setTimeout(() => playNote(note, { duration: 0.3, velocity: 0.22 }), start + 450 + j * 150);
    });
  });
}

const OPTIONS = [
  { id: "straight", label: "Straight Feel", play: playStraight },
  { id: "rolled", label: "Rolling Feel", play: playRolled },
];

export function RollingThroughMinorKeyInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Your minor progression from Module 14, straight, then rolled."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
