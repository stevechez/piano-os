"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const PROGRESSION = getProgression("classicRock");
const CHORDS = PROGRESSION.chordIds.map(getChord);

function playSimpleAndSteady() {
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.9 }), i * 700);
  });
}

function playEmbellishedAndSyncopated() {
  // Same three chords as the steady version, plus a connecting note
  // between the first two and uneven timing throughout.
  playChord(CHORDS[0].notes, { duration: 0.7 });
  window.setTimeout(() => playNote("A3", { duration: 0.25, velocity: 0.3 }), 550);
  window.setTimeout(() => playChord(CHORDS[1].notes, { duration: 0.9 }), 750);
  window.setTimeout(() => playChord(CHORDS[2].notes, { duration: 0.9 }), 1550);
}

const OPTIONS = [
  { id: "simple", label: "Simple & Steady", play: playSimpleAndSteady },
  { id: "embellished", label: "Embellished & Syncopated", play: playEmbellishedAndSyncopated },
];

export function ArrangeItYourWayInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Combine what you've learned. Same progression, arranged two different ways."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
