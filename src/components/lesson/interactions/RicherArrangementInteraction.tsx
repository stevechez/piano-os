"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const D_MINOR = getChord("dMinor");
const G_MAJOR = getChord("gMajor");
const G7 = getChord("g7");
const C_MAJOR = getChord("cMajor");

function playSimpleTriads() {
  playChord(D_MINOR.notes, { duration: 0.7 });
  window.setTimeout(() => playChord(G_MAJOR.notes, { duration: 0.7 }), 700);
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 0.9 }), 1400);
}

function playWithTheSeventh() {
  playChord(D_MINOR.notes, { duration: 0.7 });
  window.setTimeout(() => playChord(G7.notes, { duration: 0.7 }), 700);
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 0.9 }), 1400);
}

const OPTIONS = [
  { id: "simple", label: "Simple Triads", play: playSimpleTriads },
  { id: "seventh", label: "With the Seventh", play: playWithTheSeventh },
];

export function RicherArrangementInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Dm to G to C, plain — then the same progression with G7 instead of G."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
