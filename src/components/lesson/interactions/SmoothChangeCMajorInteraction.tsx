"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("cMajor");

export function SmoothChangeCMajorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "C Major. Remember this shape."
          : `Play C Major: root, third, fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
