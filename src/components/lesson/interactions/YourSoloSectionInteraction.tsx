"use client";

import { getChord, getProgression } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const BRIDGE = getProgression("myBridge");
const BACKING = BRIDGE.chordIds.map((id) => getChord(id).notes);

export function YourSoloSectionInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={8}
      prompt={(played, total) =>
        played >= total
          ? "That's a real solo section — Module 6's safety net, placed inside your own song's structure."
          : `The bridge is also where a solo often lives. Play freely over it (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
