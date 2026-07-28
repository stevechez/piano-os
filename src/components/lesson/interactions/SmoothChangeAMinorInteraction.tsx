"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

// Order deliberately isn't root-third-fifth — it's "the notes that don't
// move" first (C4, E4, shared with C Major), then the one note that does
// (G4 -> A3). That's the actual point of the lesson.
const SEQUENCE = ["C4", "E4", "A3"];

export function SmoothChangeAMinorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "Two notes never moved."
          : index < 2
            ? `Leave your fingers on C and E — they don't move (${index} of ${total}).`
            : `Now move only the third finger, down to A (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
