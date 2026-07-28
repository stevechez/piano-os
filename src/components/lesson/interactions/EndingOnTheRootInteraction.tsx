"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const B_FLAT_MAJOR = getChord("bFlatMajor");

function playVampChords(chords: ReturnType<typeof getChord>[]) {
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.7 }), i * 700);
  });
}

function playEndOnBFlat() {
  playVampChords([C_MAJOR, B_FLAT_MAJOR, C_MAJOR, B_FLAT_MAJOR]);
}

function playResolveToC() {
  playVampChords([C_MAJOR, B_FLAT_MAJOR, C_MAJOR, B_FLAT_MAJOR, C_MAJOR]);
}

const OPTIONS = [
  { id: "end-bflat", label: "End on B♭", play: playEndOnBFlat },
  { id: "resolve-c", label: "Resolve to C", play: playResolveToC },
];

export function EndingOnTheRootInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare ending the vamp on the B♭ chord to resolving back to C."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
