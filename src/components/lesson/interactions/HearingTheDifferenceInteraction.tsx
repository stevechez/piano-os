"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");
const F_MAJOR = getChord("fMajor");
const F_MINOR = getChord("fMinor");

function playJourney(middle: ReturnType<typeof getChord>) {
  playChord(C_MAJOR.notes, { duration: 0.8 });
  window.setTimeout(() => playChord(middle.notes, { duration: 0.8 }), 700);
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 0.9 }), 1400);
}

const OPTIONS = [
  { id: "diatonic", label: "Diatonic Version", play: () => playJourney(F_MAJOR) },
  { id: "borrowed", label: "Borrowed Version", play: () => playJourney(F_MINOR) },
];

export function HearingTheDifferenceInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Same journey — C to a middle chord and back to C. Compare the diatonic middle chord to the borrowed one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
