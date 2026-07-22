"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

const PROGRESSION = getProgression("classicPop");
const CHORDS = PROGRESSION.chordIds.map(getChord);

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function ChordsCreateSongsInteraction({
  onComplete,
}: LessonInteractionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [ringingNotes, setRingingNotes] = useState<string[]>([]);

  const handleChipClick = (index: number) => {
    if (index !== currentStep) return;

    const chord = CHORDS[index];
    playChord(chord.notes);
    setRingingNotes(chord.notes);
    window.setTimeout(() => setRingingNotes([]), 900);

    const next = index + 1;
    setCurrentStep(next);
    if (next === CHORDS.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Click each chord in order to hear the progression:{" "}
        <span className="text-foreground">{PROGRESSION.label}</span>
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CHORDS.map((chord, i) => {
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
          currentStep < CHORDS.length ? CHORDS[currentStep].notes : []
        }
        activeNotes={ringingNotes}
        size="lg"
      />
    </div>
  );
}
