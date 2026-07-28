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

function playWaltz() {
  CHORDS.forEach((chord, i) => {
    const start = i * 900;
    const bass = chord.notes[0];
    const upper = chord.notes[chord.notes.length - 1];
    window.setTimeout(() => playNote(bass, { duration: 0.3 }), start);
    window.setTimeout(() => playNote(upper, { duration: 0.25, velocity: 0.25 }), start + 300);
    window.setTimeout(() => playNote(upper, { duration: 0.25, velocity: 0.25 }), start + 600);
  });
}

const OPTIONS = [
  { id: "straight", label: "4/4 Feel", play: playStraight },
  { id: "waltz", label: "3/4 Feel", play: playWaltz },
];

export function OwnSongWaltzTimeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Your own chorus from Module 7, in two different meters."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
