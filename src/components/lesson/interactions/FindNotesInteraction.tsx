"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";

export interface FindNotesInteractionProps {
  /** Notes (scientific pitch notation) the student must find, in any order. */
  targetNotes: string[];
  /** Prompt copy, given how many of the targets have been found so far. */
  prompt: (found: number, total: number) => string;
  startOctave?: number;
  endOctave?: number;
  onComplete: () => void;
}

/**
 * The "find every one of these notes on the keyboard" mechanic — shared by
 * every lesson that teaches a landmark or pattern this way (onboarding's
 * pattern-machine, Module 1's black-key-group and finding-notes steps). See
 * docs/44-learning-curriculum-architecture.md: this is one recurring
 * interaction *shape*, not a generic lesson template — lessons whose
 * interaction is meaningfully different (playing a chord, stepping through
 * a progression) still get their own bespoke component.
 */
export function FindNotesInteraction({
  targetNotes,
  prompt,
  startOctave = 3,
  endOctave = 6,
  onComplete,
}: FindNotesInteractionProps) {
  const [found, setFound] = useState<Set<string>>(new Set());

  const handleNotePlay = (note: string) => {
    if (!targetNotes.includes(note) || found.has(note)) return;

    const next = new Set(found);
    next.add(note);
    setFound(next);

    if (next.size === targetNotes.length) {
      onComplete();
    }
  };

  const remaining = targetNotes.filter((n) => !found.has(n));

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {prompt(found.size, targetNotes.length)}
      </p>

      <PianoKeyboard
        startOctave={startOctave}
        endOctave={endOctave}
        highlightedNotes={remaining}
        activeNotes={Array.from(found)}
        onNotePlay={handleNotePlay}
        showLabels
        labelFilter={(note) => targetNotes.includes(note)}
        size="lg"
      />
    </div>
  );
}
