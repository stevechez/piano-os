"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("dMinor");

export function DiatonicChordsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={CHORD.notes}
      prompt={(index, total) =>
        index === total
          ? "D Minor — built entirely from notes already in C Major's scale."
          : `Build a chord starting on D, using only notes from the C major scale (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
