"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");

function playLick(notes: string[]) {
  playChord(C_MAJOR.notes, { duration: 1.6 });
  notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.35 }), 150 + i * 280);
  });
}

const MAJOR_LICK = ["E4", "G4", "A4"];
const MIXOLYDIAN_LICK = ["F4", "A#4", "G4"];

const OPTIONS = [
  { id: "major-flavor", label: "Major Flavor", play: () => playLick(MAJOR_LICK) },
  { id: "mixolydian-flavor", label: "Mixolydian Flavor", play: () => playLick(MIXOLYDIAN_LICK) },
];

export function SameChordsDifferentMoodInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The chord underneath doesn't change. Compare a melody built from your original safety net to one built from this new one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
