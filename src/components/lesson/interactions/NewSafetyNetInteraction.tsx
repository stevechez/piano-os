"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const MIXOLYDIAN_NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "A#4"];
const VAMP = getProgression("mixolydianVamp");
const BACKING = VAMP.chordIds.map((id) => getChord(id).notes);

export function NewSafetyNetInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={MIXOLYDIAN_NOTES}
      backingChords={BACKING}
      requiredPlays={8}
      prompt={(played, total) =>
        played >= total
          ? "That's your new safety net — a different color from Module 6's, same permission to experiment."
          : `Every note in this scale sounds good over this vamp. Play freely (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
