"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("aMinor");

export function BuildAMinorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "That's A Minor — same shape, one note lower."
          : `Play the ${["root", "lowered third", "fifth"][index]} of A Minor (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
