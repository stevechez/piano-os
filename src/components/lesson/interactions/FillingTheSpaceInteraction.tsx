"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const FILL_NOTES = ["G4", "A4", "B4"];

function playHold() {
  playChord(C_MAJOR.notes, { duration: 1.6 });
}

function playWithFill() {
  playChord(C_MAJOR.notes, { duration: 0.8 });
  FILL_NOTES.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.22, velocity: 0.3 }), 850 + i * 180);
  });
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 0.8 }), 850 + FILL_NOTES.length * 180 + 100);
}

const OPTIONS = [
  { id: "hold", label: "Just Hold the Chord", play: playHold },
  { id: "fill", label: "Add a Fill Between Phrases", play: playWithFill },
];

export function FillingTheSpaceInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="When a singer pauses between phrases, you don't have to just wait. Compare holding the chord versus filling the gap."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
