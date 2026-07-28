"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const A_MINOR = getChord("aMinor");
const MELODY_NOTE = "E4";

function playWithCMajor() {
  playChord(C_MAJOR.notes, { duration: 0.9 });
  window.setTimeout(() => playNote(MELODY_NOTE, { duration: 0.6 }), 150);
}

function playWithAMinor() {
  playChord(A_MINOR.notes, { duration: 0.9 });
  window.setTimeout(() => playNote(MELODY_NOTE, { duration: 0.6 }), 150);
}

const OPTIONS = [
  { id: "c-major", label: "Harmonize with C Major", play: playWithCMajor },
  { id: "a-minor", label: "Harmonize with A Minor", play: playWithAMinor },
];

export function HarmonizingMelodyInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same melody note, E, belongs to more than one chord. Try harmonizing it two different ways."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
