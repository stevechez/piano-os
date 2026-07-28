"use client";

import { useState } from "react";
import { playNote } from "@/lib/audio/piano-synth";
import { NoteSequenceInteraction } from "./NoteSequenceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

// "Mary Had a Little Lamb," opening phrase — traditional, public domain.
const MELODY = ["E4", "D4", "C4", "D4", "E4", "E4", "E4"];
const NOTE_GAP_S = 0.38;

function playMelodyPreview() {
  MELODY.forEach((note, i) => {
    playNote(note, { duration: 0.32, when: i * NOTE_GAP_S });
  });
}

/**
 * A preview trigger layered over the existing NoteSequenceInteraction —
 * the new thing here is hearing the target first, not a new click
 * mechanic. See docs/46-curriculum-authoring-guide.md.
 */
export function PlayByEarInteraction({ onComplete }: LessonInteractionProps) {
  const [previewed, setPreviewed] = useState(false);

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Listen to this short melody, then find the same notes yourself — no
        sheet music, just your ear and the keyboard.
      </p>

      <button
        type="button"
        onClick={() => {
          playMelodyPreview();
          setPreviewed(true);
        }}
        className="rounded-full border border-gold/60 bg-gold/10 px-6 py-3 text-sm font-medium text-foreground transition-transform hover:scale-[1.02]"
      >
        {previewed ? "Hear it again" : "Hear the melody"}
      </button>

      <NoteSequenceInteraction
        sequence={MELODY}
        prompt={(index, total) =>
          index === total
            ? "That's the melody, found by ear."
            : `Play it back, one note at a time (${index} of ${total}).`
        }
        onComplete={onComplete}
      />
    </div>
  );
}
