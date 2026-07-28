"use client";

import { useEffect, useRef, useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";

export interface FreePlayInteractionProps {
  /** Notes the student can freely play, in any order, any number of times. */
  safeNotes: string[];
  /** Chord(s) looped softly underneath, one after another, then repeating. */
  backingChords: string[][];
  /** Distinct safe-note presses required before the lesson completes. */
  requiredPlays: number;
  prompt: (played: number, total: number) => string;
  startOctave?: number;
  endOctave?: number;
  onComplete: () => void;
}

const BACKING_CHORD_DURATION_MS = 1600;

/**
 * Open-ended improvisation: unlike every prior interaction, there is no
 * fixed order (NoteSequenceInteraction) and no small discrete set of
 * pre-defined options (ChoiceInteraction) — the student plays anything
 * they want, as many times as they want, from a "safety net" set of notes
 * that always sounds good over the looping backing chord(s) underneath.
 * Completion fires once a threshold of safe-note presses is reached, not
 * because any specific note or order was "correct." Genuinely new
 * mechanic, introduced for Module 6 and reused across most of its
 * lessons — see docs/46-curriculum-authoring-guide.md.
 */
export function FreePlayInteraction({
  safeNotes,
  backingChords,
  requiredPlays,
  prompt,
  startOctave = 3,
  endOctave = 6,
  onComplete,
}: FreePlayInteractionProps) {
  const [played, setPlayed] = useState<string[]>([]);
  const playedCountRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    let stopped = false;
    let index = 0;

    function loop() {
      if (stopped || doneRef.current) return;
      playChord(backingChords[index % backingChords.length], { duration: 1.3 });
      index += 1;
      window.setTimeout(loop, BACKING_CHORD_DURATION_MS);
    }

    loop();
    return () => {
      stopped = true;
    };
  }, [backingChords]);

  const safeSet = new Set(safeNotes);

  const handleNotePlay = (note: string) => {
    if (doneRef.current || !safeSet.has(note)) return;

    playedCountRef.current += 1;
    setPlayed((prev) => [...prev, note]);

    if (playedCountRef.current >= requiredPlays) {
      doneRef.current = true;
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {prompt(Math.min(played.length, requiredPlays), requiredPlays)}
      </p>

      <PianoKeyboard
        startOctave={startOctave}
        endOctave={endOctave}
        highlightedNotes={safeNotes}
        activeNotes={played}
        onNotePlay={handleNotePlay}
        showLabels
        labelFilter={(note) => safeSet.has(note)}
        size="lg"
      />
    </div>
  );
}
