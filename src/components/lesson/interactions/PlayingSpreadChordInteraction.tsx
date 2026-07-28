"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SEQUENCE = ["F3", "A3", "C5"];

export function PlayingSpreadChordInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "One more spread voicing, built by hand — the same technique, a different chord."
          : `Build one more spread voicing yourself: F Major, spread (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
