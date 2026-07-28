"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const F_MINOR_NOTES = ["F3", "G#3", "C4"];

export function BuildingBorrowedChordInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={F_MINOR_NOTES}
      prompt={(index, total) =>
        index === total
          ? "Root, minor third, fifth — the same formula as every minor chord you've built."
          : `Build F Minor: root, then minor third, then fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
