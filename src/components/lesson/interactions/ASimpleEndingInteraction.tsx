"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C_MAJOR = getChord("cMajor");

function playFadeOut() {
  playChord(C_MAJOR.notes, { duration: 1.2, velocity: 0.3 });
  window.setTimeout(() => playChord(C_MAJOR.notes, { duration: 1.4, velocity: 0.15 }), 900);
}

function playStrongFinal() {
  playChord(C_MAJOR.notes, { duration: 1.8, velocity: 0.5 });
}

const OPTIONS = [
  { id: "fade", label: "Fade Out", play: playFadeOut },
  { id: "strong", label: "Strong Final Chord", play: playStrongFinal },
];

export function ASimpleEndingInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Every song needs an ending. Compare fading out to landing on one strong final chord."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
