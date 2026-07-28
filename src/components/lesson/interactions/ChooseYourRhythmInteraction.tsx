"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const PROGRESSION = getProgression("classicRock");
const CHORDS = PROGRESSION.chordIds.map(getChord);

function playSteady() {
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.9 }), i * 700);
  });
}

function playSyncopated() {
  // Uneven gaps -- some chords land early, some linger -- same three
  // chords, a completely different feel.
  const offsets = [0, 500, 1300];
  CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.9 }), offsets[i]);
  });
}

const OPTIONS = [
  { id: "steady", label: "Steady", play: playSteady },
  { id: "syncopated", label: "Syncopated", play: playSyncopated },
];

export function ChooseYourRhythmInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt={`The same progression (${PROGRESSION.label}), two different feels.`}
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
