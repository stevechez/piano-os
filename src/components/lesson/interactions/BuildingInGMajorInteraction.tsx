"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const G_MAJOR_NOTES = ["G3", "B3", "D4"];

export function BuildingInGMajorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={G_MAJOR_NOTES}
      prompt={(index, total) =>
        index === total
          ? "Root, third, fifth — it never changes, no matter which key you're in."
          : `Build G Major, the same way you've built every major chord (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
