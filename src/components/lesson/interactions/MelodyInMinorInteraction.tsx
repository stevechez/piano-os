"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const A_MINOR_PENTATONIC = ["A3", "C4", "D4", "E4", "G4"];
const BACKING = getProgression("myMinorVerse").chordIds.map((id) => getChord(id).notes);

export function MelodyInMinorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={A_MINOR_PENTATONIC}
      backingChords={BACKING}
      requiredPlays={6}
      prompt={(played, total) =>
        played >= total
          ? "The same improvising instinct from Module 6, now shaping a minor mood."
          : `Your minor verse is looping underneath. Play a melody over it (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
