"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const PROGRESSION = getProgression("classicPop");
const BACKING = PROGRESSION.chordIds.map((id) => getChord(id).notes);

export function YouAreAlreadyImprovisingInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={10}
      prompt={(played, total) =>
        played >= total
          ? "You are already improvising. Every choice you just made was yours."
          : `One more time — freely, however you like (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
