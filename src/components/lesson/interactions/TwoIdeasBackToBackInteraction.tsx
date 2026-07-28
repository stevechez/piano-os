"use client";

import { playNote } from "@/lib/audio/piano-synth";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const IDEA_A = ["C4", "E4", "G4"];
const IDEA_B = ["A4", "G4", "E4"];

function playPhrase(notes: string[], startAt: number) {
  notes.forEach((note, i) => {
    window.setTimeout(() => playNote(note, { duration: 0.4 }), startAt + i * 320);
  });
}

function playSameIdeaTwice() {
  playPhrase(IDEA_A, 0);
  playPhrase(IDEA_A, 1200);
}

function playTwoDifferentIdeas() {
  playPhrase(IDEA_A, 0);
  playPhrase(IDEA_B, 1200);
}

const OPTIONS = [
  { id: "same", label: "Same Idea Twice", play: playSameIdeaTwice },
  { id: "different", label: "Two Different Ideas", play: playTwoDifferentIdeas },
];

export function TwoIdeasBackToBackInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare repeating the same musical idea versus following it with a different one."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
