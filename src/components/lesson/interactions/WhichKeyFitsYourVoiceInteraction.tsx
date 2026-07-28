"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

function playProgressionSteady(progressionId: string) {
  const progression = getProgression(progressionId);
  const chords = progression.chordIds.map(getChord);
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), i * 700);
  });
}

const OPTIONS = [
  { id: "in-c", label: "In C", play: () => playProgressionSteady("myVerse") },
  { id: "in-g", label: "In G", play: () => playProgressionSteady("myVerseInG") },
];

export function WhichKeyFitsYourVoiceInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same song, in two different keys. Compare how each one feels."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
