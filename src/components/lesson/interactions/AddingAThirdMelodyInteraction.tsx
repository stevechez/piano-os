"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const VERSE = getProgression("myThirdVerse");
const BACKING = VERSE.chordIds.map((id) => getChord(id).notes);

export function AddingAThirdMelodyInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={6}
      prompt={(played, total) =>
        played >= total
          ? "That melody, over your own verse, is part of your third song now."
          : `Your verse is looping underneath. Play a melody over it, freely (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
