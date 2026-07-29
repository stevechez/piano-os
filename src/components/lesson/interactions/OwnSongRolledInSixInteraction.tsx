"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORDS = ["fMajor", "gMajor", "cMajor"].map(getChord);

function playStraight() {
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

function playRolled() {
  CHORDS.forEach((chord, i) => {
    const start = i * 900;
    [chord.notes[0], chord.notes[1] ?? chord.notes[0], chord.notes[2] ?? chord.notes[0]].forEach((note, j) => {
      window.setTimeout(() => playNote(note, { duration: 0.3, velocity: 0.3 }), start + j * 150);
    });
    [chord.notes[0], chord.notes[1] ?? chord.notes[0], chord.notes[2] ?? chord.notes[0]].forEach((note, j) => {
      window.setTimeout(() => playNote(note, { duration: 0.3, velocity: 0.25 }), start + 450 + j * 150);
    });
  });
}

const OPTIONS = [
  { id: "straight", label: "4/4 Feel", play: playStraight },
  { id: "rolled", label: "6/8 Feel", play: playRolled },
];

export function OwnSongRolledInSixInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Your own chorus from Module 7, in two different meters."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
