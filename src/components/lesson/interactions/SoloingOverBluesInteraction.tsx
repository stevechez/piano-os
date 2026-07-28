"use client";

import { getChord } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const BLUES_SCALE = ["C4", "D#4", "F4", "G4", "A#4"];
const BACKING = ["c7", "f7", "g7"].map((id) => getChord(id).notes);

export function SoloingOverBluesInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={BLUES_SCALE}
      backingChords={BACKING}
      requiredPlays={8}
      prompt={(played, total) =>
        played >= total
          ? "That clash between a minor scale and dominant chords is the sound of the blues."
          : `Improvise over the blues, using this five-note blues scale (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
