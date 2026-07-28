"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("g7");

export function BuildG7Interaction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "That's G7 — a major chord with one more note added on top."
          : `Play G7: root, third, fifth, then the seventh (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
