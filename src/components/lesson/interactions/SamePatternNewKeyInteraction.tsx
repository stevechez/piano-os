"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playProgression(progressionId: string) {
  const chords = getProgression(progressionId).chordIds.map(getChord);
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.7 }), i * 700);
  });
}

const OPTIONS = [
  { id: "same", label: "Same Pattern, New Key" },
  { id: "different", label: "A Different Pattern" },
];

const ROUNDS = [
  { play: () => playProgression("myVerseInG"), options: OPTIONS, answerId: "same" },
  { play: () => playProgression("classicRock"), options: OPTIONS, answerId: "different" },
];

export function SamePatternNewKeyInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="Same pattern moved to a new key, or a genuinely different pattern? Listen and decide."
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
