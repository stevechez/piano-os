"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("cMajor");

/**
 * Shared second step for both "Seventh Chords" and "Suspended Chords" --
 * both lessons end the same way: resolve back to plain C Major. One
 * component, registered under two step ids.
 */
export function ResolveToCMajorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "That's resolution — tension, then release."
          : `Now resolve to C Major (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
