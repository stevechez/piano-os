"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");

function playJumpIn() {
  playChord(C_MAJOR.notes);
}

function playBuildUp() {
  C_MAJOR.notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.5 }), i * 350);
  });
  window.setTimeout(() => playChord(C_MAJOR.notes), C_MAJOR.notes.length * 350 + 150);
}

const OPTIONS = [
  { id: "jump-in", label: "Jump Straight In", play: playJumpIn },
  { id: "build-up", label: "Build Up To It", play: playBuildUp },
];

export function CreateYourIntroInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Two ways to begin the same chord. Neither is more correct — how you start is already a musical choice."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
