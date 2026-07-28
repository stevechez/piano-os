"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["C3", "G4", "E4"];

export function BuildingSpreadVoicingInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "That's the same chord — just given room to breathe."
          : `Build a spread voicing yourself: root low, fifth and third up high (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
