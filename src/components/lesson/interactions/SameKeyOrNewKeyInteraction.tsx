"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const D_MAJOR = getChord("dMajor");
const G_MAJOR = getChord("gMajor");

const OPTIONS = [
  { id: "same", label: "Same Key" },
  { id: "new", label: "New Key" },
];

const ROUNDS = [
  { play: () => playChord(C_MAJOR.notes), options: OPTIONS, answerId: "same" },
  { play: () => playChord(G_MAJOR.notes), options: OPTIONS, answerId: "new" },
  { play: () => playChord(D_MAJOR.notes), options: OPTIONS, answerId: "new" },
];

export function SameKeyOrNewKeyInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Did the song stay home, or move to the new key?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
