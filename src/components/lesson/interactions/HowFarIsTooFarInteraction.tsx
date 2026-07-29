"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const G_MAJOR = getChord("gMajor");
const B_FLAT_MAJOR = getChord("bFlatMajor");

function playInto(chord: ReturnType<typeof getChord>) {
  playChord(C_MAJOR.notes, { duration: 0.7 });
  window.setTimeout(() => playChord(chord.notes, { duration: 1.2 }), 650);
}

const OPTIONS = [
  { id: "nearby", label: "Nearby: C → G", play: () => playInto(G_MAJOR) },
  { id: "distant", label: "Distant: C → B♭", play: () => playInto(B_FLAT_MAJOR) },
];

export function HowFarIsTooFarInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare a nearby key change to a more distant one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
