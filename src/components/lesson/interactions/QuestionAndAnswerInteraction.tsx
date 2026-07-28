"use client";

import { useEffect } from "react";
import { playNote } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { FreePlayInteraction } from "./FreePlayInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const QUESTION_PHRASE = ["C4", "E4", "G4"];
const SAFETY_NET_NOTES = ["C4", "D4", "E4", "G4", "A4"];
const BACKING = [getChord("cMajor").notes];

export function QuestionAndAnswerInteraction({ onComplete }: LessonInteractionProps) {
  useEffect(() => {
    QUESTION_PHRASE.forEach((note, i) => {
      window.setTimeout(() => playNote(note, { duration: 0.5 }), i * 350);
    });
  }, []);

  return (
    <FreePlayInteraction
      safeNotes={SAFETY_NET_NOTES}
      backingChords={BACKING}
      requiredPlays={5}
      prompt={(played, total) =>
        played >= total
          ? "You just improvised a real answer to a real musical question."
          : `That was the question. Play your own answer, using any safety net note (${played} of ${total}).`
      }
      onComplete={onComplete}
    />
  );
}
