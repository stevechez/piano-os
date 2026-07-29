"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const D_MINOR = getChord("dMinor");
const D_MAJOR = getChord("dMajor");
const G_MAJOR = getChord("gMajor");

function playInto(chord: ReturnType<typeof getChord>) {
  playChord(chord.notes, { duration: 0.7 });
  window.setTimeout(() => playChord(G_MAJOR.notes, { duration: 1.0 }), 650);
}

const OPTIONS = [
  { id: "ii", label: "D Minor → G (ii)", play: () => playInto(D_MINOR) },
  { id: "v-of-v", label: "D Major → G (V/V)", play: () => playInto(D_MAJOR) },
];

export function TwoRoadsToGInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare the diatonic ii chord to its secondary-dominant substitute."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
