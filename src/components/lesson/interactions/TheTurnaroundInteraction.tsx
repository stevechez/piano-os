"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C7 = getChord("c7");
const G7 = getChord("g7");

function playEnding(final: ReturnType<typeof getChord>) {
  playChord(C7.notes, { duration: 0.8 });
  window.setTimeout(() => playChord(final.notes, { duration: 1.3 }), 750);
}

const OPTIONS = [
  { id: "home", label: "End on Home", play: () => playEnding(C7) },
  { id: "turnaround", label: "The Turnaround", play: () => playEnding(G7) },
];

export function TheTurnaroundInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare ending a blues chorus on the home chord versus on the turnaround."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
