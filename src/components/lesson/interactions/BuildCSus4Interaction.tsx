"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("cSus4");

export function BuildCSus4Interaction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "That's Csus4 — neither major nor minor. The third is gone."
          : `Play Csus4: root, fourth (instead of a third), fifth (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
