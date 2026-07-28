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

function playEnding(secondToLast: ReturnType<typeof getChord>) {
  playChord(secondToLast.notes, { duration: 0.9 });
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 1.4 }), 800);
}

const OPTIONS = [
  { id: "original", label: "Your Original Ending", play: () => playEnding(G_MAJOR) },
  { id: "borrowed", label: "Borrowed Ending", play: () => playEnding(B_FLAT_MAJOR) },
];

export function ReharmonizingYourEndingInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Remember the song you wrote in Module 7? Its ending has another option. Compare the original to a borrowed one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
