"use client";

import { useMemo, useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { generateNoteRange, midiNumber } from "@/lib/music/notes";
import { playChord } from "@/lib/audio/piano-synth";

const START_OCTAVE = 3;
const END_OCTAVE = 6;

export interface IntervalPairInteractionProps {
  /** Semitones between the anchor and its target, in either direction. */
  semitones: number;
  promptBeforeAnchor: string;
  promptAfterAnchor: string;
  promptDone: string;
  onComplete: () => void;
}

/**
 * "Click a note, then find the note exactly N semitones away" — the shape
 * shared by Module 1's Octaves (12 semitones) and Intervals (7 semitones,
 * a fifth) lessons. Extracted once a second genuinely-identical mechanic
 * appeared, per docs/46-curriculum-authoring-guide.md's reuse rule — same
 * reasoning as FindNotesInteraction.
 */
export function IntervalPairInteraction({
  semitones,
  promptBeforeAnchor,
  promptAfterAnchor,
  promptDone,
  onComplete,
}: IntervalPairInteractionProps) {
  const notes = useMemo(() => generateNoteRange(START_OCTAVE, END_OCTAVE), []);
  const [anchor, setAnchor] = useState<string | null>(null);
  const [partner, setPartner] = useState<string | null>(null);

  const targets = useMemo(() => {
    if (!anchor) return [];
    const anchorMidi = midiNumber(anchor);
    return notes
      .filter((n) => Math.abs(midiNumber(n.id) - anchorMidi) === semitones)
      .map((n) => n.id);
  }, [anchor, notes, semitones]);

  const handleNotePlay = (note: string) => {
    if (partner) return;
    if (!anchor) {
      setAnchor(note);
      return;
    }
    if (note === anchor || !targets.includes(note)) return;
    playChord([anchor, note]);
    setPartner(note);
    onComplete();
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {!anchor ? promptBeforeAnchor : partner ? promptDone : promptAfterAnchor}
      </p>

      <PianoKeyboard
        startOctave={START_OCTAVE}
        endOctave={END_OCTAVE}
        highlightedNotes={anchor && !partner ? targets : []}
        activeNotes={[anchor, partner].filter((n): n is string => !!n)}
        onNotePlay={handleNotePlay}
        size="lg"
      />
    </div>
  );
}
