"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("aMajor");

export function BuildAMajorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "That's A Major — bright and resolved."
          : `Play the ${["root", "third", "fifth"][index]} of A Major (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
