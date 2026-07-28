"use client";

import { useMemo } from "react";
import { generateNoteRange, notesOfPitchClass } from "@/lib/music/notes";
import { FindNotesInteraction } from "./FindNotesInteraction";

const START_OCTAVE = 3;
const END_OCTAVE = 6;

export interface LessonInteractionProps {
  onComplete: () => void;
}

/**
 * Same target as Module 1's "Finding Notes" (F, landmark: left of the
 * group-of-three black keys) — but with no highlight and no letter labels.
 * The point isn't a new note, it's proving the landmark was actually
 * internalized, not just followed visually.
 */
export function LandmarkRecallInteraction({ onComplete }: LessonInteractionProps) {
  const targetNotes = useMemo(
    () => notesOfPitchClass(generateNoteRange(START_OCTAVE, END_OCTAVE), "F"),
    []
  );

  return (
    <FindNotesInteraction
      targetNotes={targetNotes}
      startOctave={START_OCTAVE}
      endOctave={END_OCTAVE}
      showTargetHints={false}
      prompt={(found, total) =>
        `No highlight this time. Find every F using the landmark alone (${found} of ${total} found).`
      }
      onComplete={onComplete}
    />
  );
}
