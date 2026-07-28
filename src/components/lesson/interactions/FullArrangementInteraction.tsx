"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const PROGRESSION = getProgression("classicPop");
const CHORDS = PROGRESSION.chordIds.map(getChord);

function playSimple() {
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.9 }), i * 800);
  });
}

function playFullArrangement() {
  CHORDS.forEach((chord, i) => {
    const bassNote = chord.notes[0];
    window.setTimeout(() => playNote(bassNote, { duration: 0.35 }), i * 800);
    window.setTimeout(() => playChord(chord.notes, { duration: 0.5 }), i * 800 + 400);
  });
}

const OPTIONS = [
  { id: "simple", label: "Simple Accompaniment", play: playSimple },
  { id: "full", label: "Full Arrangement", play: playFullArrangement },
];

export function FullArrangementInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same progression you already know, played plainly, then with the bass-and-chord pattern from this module."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
