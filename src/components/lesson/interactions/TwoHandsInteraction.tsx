"use client";

import { getChord } from "@/lib/music/chords";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORD = getChord("cMajor");
// Left hand: the root, an octave below. Right hand: the full chord on top.
const SEQUENCE = ["C3", ...CHORD.notes];

export function TwoHandsInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <NoteSequenceInteraction
      sequence={SEQUENCE}
      prompt={(index, total) =>
        index === total
          ? "Bass note, then chord. That's two hands working together."
          : index === 0
            ? `Left hand: play the low C — just the root (${index} of ${total}).`
            : `Right hand: now add the full chord on top (${index} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
