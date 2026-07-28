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
  { id: "verse", label: "Verse Feel", play: () => playProgressionSteady("classicPop") },
  { id: "chorus", label: "Chorus Feel", play: () => playProgressionSteady("classicRock") },
];

export function VerseAndChorusInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Most songs don't use one progression the whole way through. Compare these two — one built for a verse, one for a chorus."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
