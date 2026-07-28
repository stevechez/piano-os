"use client";

import { useMemo, useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

export interface ChordProgressionInteractionProps {
  progressionId: string;
  /** Copy shown before the progression label (e.g. "C → F → G"). */
  promptLabel?: string;
  onComplete: () => void;
}

/**
 * "Click each chord in a progression, in order" — the chip-based,
 * exploratory way to hear a progression (as opposed to
 * PlayProgressionInteraction, which requires actually playing each chord
 * on the keyboard). Shared by onboarding's chords-create-songs and Module
 * 2's pattern-recognition lessons. See
 * docs/46-curriculum-authoring-guide.md.
 */
export function ChordProgressionInteraction({
  progressionId,
  promptLabel = "Click each chord in order to hear the progression:",
  onComplete,
}: ChordProgressionInteractionProps) {
  const progression = useMemo(() => getProgression(progressionId), [progressionId]);
  const chords = useMemo(
    () => progression.chordIds.map(getChord),
    [progression]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [ringingNotes, setRingingNotes] = useState<string[]>([]);

  const handleChipClick = (index: number) => {
    if (index !== currentStep) return;

    const chord = chords[index];
    playChord(chord.notes);
    setRingingNotes(chord.notes);
    window.setTimeout(() => setRingingNotes([]), 900);

    const next = index + 1;
    setCurrentStep(next);
    if (next === chords.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        {promptLabel}{" "}
        <span className="text-foreground">{progression.label}</span>
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {chords.map((chord, i) => {
          const state =
            i < currentStep ? "done" : i === currentStep ? "current" : "upcoming";

          return (
            <button
              key={chord.id}
              type="button"
              disabled={state === "upcoming"}
              onClick={() => handleChipClick(i)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition-all",
                state === "done" &&
                  "border-gold/40 bg-gold/10 text-muted-foreground",
                state === "current" &&
                  "border-gold bg-gold/15 text-foreground hover:scale-[1.02]",
                state === "upcoming" &&
                  "cursor-not-allowed border-border/60 text-muted-foreground/50"
              )}
            >
              <div className="text-xs uppercase tracking-wide opacity-70">
                {i + 1}
              </div>
              <div className="mt-1 font-serif text-lg">{chord.name}</div>
            </button>
          );
        })}
      </div>

      <PianoKeyboard
        startOctave={3}
        endOctave={5}
        highlightedNotes={
          currentStep < chords.length ? chords[currentStep].notes : []
        }
        activeNotes={ringingNotes}
        size="lg"
      />
    </div>
  );
}
