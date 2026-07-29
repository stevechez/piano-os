"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const PIVOT = getProgression("myChorusInG");
const BACKING = PIVOT.chordIds.map((id) => getChord(id).notes);

export function MelodyAcrossTheChangeInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={6}
      prompt={(played, total) =>
        played >= total
          ? "Your safety net notes worked across the whole key change — that's not an accident."
          : `Play freely across the pivot into G major (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
