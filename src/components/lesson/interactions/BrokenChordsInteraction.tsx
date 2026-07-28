"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const BROKEN_NOTES = ["C4", "E4", "G4", "C5"];

function playBlock() {
  playChord(C_MAJOR.notes);
}

function playBroken() {
  BROKEN_NOTES.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.6 }), i * 220);
  });
}

const OPTIONS = [
  { id: "block", label: "Block Chord", play: playBlock },
  { id: "broken", label: "Broken Chord", play: playBroken },
];

export function BrokenChordsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Same notes, played two ways — all at once, or one at a time."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
