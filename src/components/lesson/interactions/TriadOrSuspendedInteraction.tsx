"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const C_SUS4 = getChord("cSus4");

const OPTIONS = [
  { id: "triad", label: "Triad" },
  { id: "suspended", label: "Suspended" },
];

const ROUNDS = [
  { play: () => playChord(C_MAJOR.notes), options: OPTIONS, answerId: "triad" },
  { play: () => playChord(C_SUS4.notes), options: OPTIONS, answerId: "suspended" },
];

export function TriadOrSuspendedInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Two chords, one root. Can you hear the difference between a plain triad and a suspended chord?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
