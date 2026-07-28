"use client";

import { getChord } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const BACKING = [getChord("cMajor").notes];

export function SafetyNetScaleInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={6}
      prompt={(played, total) =>
        played >= total
          ? "That's the safety net scale — every note in it sounds good over this chord."
          : `Play freely — any of the highlighted notes, in any order (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
