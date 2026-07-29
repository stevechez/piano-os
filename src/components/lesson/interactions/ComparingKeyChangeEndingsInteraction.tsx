"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const PIVOT_CHORDS = getProgression("myChorusInG").chordIds.map(getChord);

function playSameKeyEnding() {
  playChord(C_MAJOR.notes, { duration: 1.6, velocity: 0.5 });
}

function playKeyChangeEnding() {
  PIVOT_CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

const OPTIONS = [
  { id: "same-key", label: "Same Key Ending", play: playSameKeyEnding },
  { id: "key-change", label: "Key Change Ending", play: playKeyChangeEnding },
];

export function ComparingKeyChangeEndingsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare ending your song in place to ending it with a key change."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
