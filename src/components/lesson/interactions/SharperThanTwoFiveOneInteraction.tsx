"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const TWO_FIVE_ONE = getProgression("twoFiveOne").chordIds.map(getChord);
const SECONDARY_DOMINANT = getProgression("secondaryDominantCadence").chordIds.map(getChord);

function playSequence(chords: ReturnType<typeof getChord>[]) {
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

const OPTIONS = [
  { id: "two-five-one", label: "Dm → G7 → C (ii-V-I)", play: () => playSequence(TWO_FIVE_ONE) },
  { id: "secondary-dominant", label: "D → G7 → C (V/V-V-I)", play: () => playSequence(SECONDARY_DOMINANT) },
];

export function SharperThanTwoFiveOneInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Same destination. Compare the plain ii-V-I to its secondary-dominant version."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
