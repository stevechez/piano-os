"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("eMinor");

export function PracticeEMinorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "E Minor — same formula, another key."
          : `Build E Minor yourself: root, lowered third, fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
