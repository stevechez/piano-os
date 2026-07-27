"use client";

import { useMemo } from "react";
import { generateNoteRange, notesInBlackKeyGroup } from "@/lib/music/notes";
import { FindNotesInteraction } from "./FindNotesInteraction";

const START_OCTAVE = 3;
const END_OCTAVE = 6;

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function BlackKeyPairsInteraction({ onComplete }: LessonInteractionProps) {
  const targetNotes = useMemo(
    () => notesInBlackKeyGroup(generateNoteRange(START_OCTAVE, END_OCTAVE), 2),
    []
  );

  return (
    <FindNotesInteraction
      targetNotes={targetNotes}
      startOctave={START_OCTAVE}
      endOctave={END_OCTAVE}
      prompt={(found, total) =>
        `Find every black key that belongs to a group of two (${found} of ${total} found).`
      }
      onComplete={onComplete}
    />
  );
}
