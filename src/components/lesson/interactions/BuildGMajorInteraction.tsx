"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("gMajor");

export function BuildGMajorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "That's G Major — root, third, fifth."
          : `Play the ${["root", "third", "fifth"][index]} of G Major (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
