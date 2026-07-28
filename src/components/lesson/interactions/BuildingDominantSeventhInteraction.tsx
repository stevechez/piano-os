"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const C7_NOTES = ["C4", "E4", "G4", "A#4"];

export function BuildingDominantSeventhInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={C7_NOTES}
      prompt={(index, total) =>
        index === total
          ? "That flattened seventh is the sound of the blues."
          : `Build C7 yourself — a major triad plus one more note (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
