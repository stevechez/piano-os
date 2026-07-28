"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const PROGRESSION = getProgression("classicPop");
const BACKING = PROGRESSION.chordIds.map((id) => getChord(id).notes);

export function ImprovisingOverProgressionInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={8}
      prompt={(played, total) =>
        played >= total
          ? "You just improvised over a real chord progression — the one from your very first song."
          : `The progression you already know is looping underneath. Play freely (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
