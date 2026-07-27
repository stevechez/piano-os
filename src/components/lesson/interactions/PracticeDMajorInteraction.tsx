"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("dMajor");

export function PracticeDMajorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "D Major — built, not looked up."
          : `Build D Major yourself: root, third, fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
