"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { EarTrainingInteraction } from "./EarTrainingInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const OPTIONS = [
  { id: "c", label: "C Major" },
  { id: "am", label: "A Minor" },
  { id: "f", label: "F Major" },
  { id: "g", label: "G Major" },
];

const ROUNDS = [
  { play: () => playChord(getChord("aMinor").notes), options: OPTIONS, answerId: "am" },
  { play: () => playChord(getChord("gMajor").notes), options: OPTIONS, answerId: "g" },
];

export function YourOwnChordByEarInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <EarTrainingInteraction
      prompt="One of the four chords from your own song is playing. Which one?"
      rounds={ROUNDS}
      onComplete={onComplete}
    />
  );
}
