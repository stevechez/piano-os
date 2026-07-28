"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const G_MAJOR = getChord("gMajor");
const B_FLAT_MAJOR = getChord("bFlatMajor");

const OPTIONS = [
  { id: "g-major", label: "G Major", play: () => playChord(G_MAJOR.notes) },
  { id: "b-flat-major", label: "B♭ Major", play: () => playChord(B_FLAT_MAJOR.notes) },
];

export function ChordFromFurtherAwayInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="There's another neighbor chord, from even further outside the key. Compare G Major to B♭ Major."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
