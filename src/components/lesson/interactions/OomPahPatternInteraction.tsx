"use client";

import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

// Alternating bass (Lesson 2) plus a chord on top -- bass, chord, bass, chord.
const SEQUENCE = ["C3", "C4", "E4", "G4", "G3", "C4", "E4", "G4"];

export function OomPahPatternInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "That's the oom-pah pattern — the backbone of countless piano accompaniments."
          : `Bass, then chord, then bass, then chord (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
