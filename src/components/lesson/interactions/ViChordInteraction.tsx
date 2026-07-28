"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");
const F_MAJOR = getChord("fMajor");
const A_MINOR = getChord("aMinor");

function playEndOnFMajor() {
  playChord(C_MAJOR.notes, { duration: 0.7 });
  window.setTimeout(() => playChord(G_MAJOR.notes, { duration: 0.7 }), 700);
  window.setTimeout(() => playChord(F_MAJOR.notes, { duration: 0.9 }), 1400);
}

function playEndOnAMinor() {
  playChord(C_MAJOR.notes, { duration: 0.7 });
  window.setTimeout(() => playChord(G_MAJOR.notes, { duration: 0.7 }), 700);
  window.setTimeout(() => playChord(A_MINOR.notes, { duration: 0.9 }), 1400);
}

const OPTIONS = [
  { id: "iv", label: "End on F Major", play: playEndOnFMajor },
  { id: "vi", label: "End on A Minor", play: playEndOnAMinor },
];

export function ViChordInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="C, then G, then... two different endings from the same key. Try both."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
