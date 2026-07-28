"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const E_MINOR_NOTES = ["E4", "G4", "B4"];

export function BuildingNaturalVInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={E_MINOR_NOTES}
      prompt={(index, total) =>
        index === total
          ? "E Minor is the 'natural' five chord in A minor — softer than the version most songs actually use."
          : `Build A minor's own five chord, root to fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
