"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const BASS_NOTES = ["C3", "A#3", "C3", "A#3"];

function playSteady() {
  BASS_NOTES.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), i * 400);
  });
}

function playSyncopated() {
  const offsets = [0, 300, 700, 1050];
  BASS_NOTES.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), offsets[i]);
  });
}

const OPTIONS = [
  { id: "steady", label: "Steady Groove", play: playSteady },
  { id: "syncopated", label: "Syncopated Groove", play: playSyncopated },
];

export function GroovingInMixolydianInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Rhythm still matters here too. Compare a steady groove to a syncopated one under the vamp."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
