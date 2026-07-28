"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const G_MAJOR_PENTATONIC = ["G4", "A4", "B4", "D5", "E5"];
const VERSE_IN_G = getProgression("myVerseInG");
const BACKING = VERSE_IN_G.chordIds.map((id) => getChord(id).notes);

export function PlayAnywhereNowInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={G_MAJOR_PENTATONIC}
      backingChords={BACKING}
      requiredPlays={8}
      prompt={(played, total) =>
        played >= total
          ? "The safety net moved with the key. Everything you've learned is portable."
          : `Improvise over your progression again — this time in G (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
