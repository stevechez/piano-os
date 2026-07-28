"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const A_MINOR_PENTATONIC = ["A3", "C4", "D4", "E4", "G4"];
const BACKING = getProgression("myMinorHomeProgression").chordIds.map((id) => getChord(id).notes);

export function SoloInMinorKeyInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={A_MINOR_PENTATONIC}
      backingChords={BACKING}
      requiredPlays={8}
      prompt={(played, total) =>
        played >= total
          ? "The safety net didn't just move to a new starting note. It moved to a whole new home."
          : `Improvise freely — this safety net is built for a minor home (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
