"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");

function playPlainChange() {
  playChord(C_MAJOR.notes);
  window.setTimeout(() => playChord(G_MAJOR.notes), 900);
}

function playWithFill() {
  playChord(C_MAJOR.notes);
  window.setTimeout(() => playNote("A3", { duration: 0.3, velocity: 0.3 }), 900);
  window.setTimeout(() => playChord(G_MAJOR.notes), 1250);
}

const OPTIONS = [
  { id: "plain", label: "Plain Change", play: playPlainChange },
  { id: "fill", label: "With a Fill", play: playWithFill },
];

export function AddingAFillInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Same chord change, C Major to G Major. One has a tiny extra note connecting them."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
