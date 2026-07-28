"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const MIXOLYDIAN_NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "A#4"];
const VAMP = getProgression("mixolydianVamp");
const BACKING = VAMP.chordIds.map((id) => getChord(id).notes);

export function HearInMoreThanOneColorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={MIXOLYDIAN_NOTES}
      backingChords={BACKING}
      requiredPlays={10}
      prompt={(played, total) =>
        played >= total
          ? "Between the safety net scale, borrowed chords, and this mode, you have more than one way to hear the same key."
          : `One more time — freely, in this new color (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
