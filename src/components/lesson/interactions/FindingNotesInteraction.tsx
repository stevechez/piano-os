"use client";

import { useMemo } from "react";
import { generateNoteRange, notesOfPitchClass } from "@/lib/music/notes";
import { FindNotesInteraction } from "./FindNotesInteraction";

const START_OCTAVE = 3;
const END_OCTAVE = 6;

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FindingNotesInteraction({ onComplete }: LessonInteractionProps) {
  const targetNotes = useMemo(
    () => notesOfPitchClass(generateNoteRange(START_OCTAVE, END_OCTAVE), "F"),
    []
  );

  return (
    <FindNotesInteraction
      targetNotes={targetNotes}
      startOctave={START_OCTAVE}
      endOctave={END_OCTAVE}
      prompt={(found, total) =>
        `F always sits just left of a group of three black keys. Find all ${total} Fs using that landmark (${found} of ${total} found).`
      }
      onComplete={onComplete}
    />
  );
}
