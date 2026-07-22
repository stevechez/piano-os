"use client";

import { useMemo, useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { cn } from "@/lib/utils";

const TARGET_NOTES = ["C4", "E4", "G4"];
const TARGET_LABELS = ["C", "E", "G"];

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function WelcomeInteraction({ onComplete }: LessonInteractionProps) {
  const [played, setPlayed] = useState<Set<string>>(new Set());

  const handleNotePlay = (note: string) => {
    if (!TARGET_NOTES.includes(note) || played.has(note)) return;

    const next = new Set(played);
    next.add(note);
    setPlayed(next);

    if (next.size === TARGET_NOTES.length) {
      onComplete();
    }
  };

  const remaining = useMemo(
    () => TARGET_NOTES.filter((n) => !played.has(n)),
    [played]
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Find and click these three notes, in any order:
        </p>
        <div className="flex gap-2">
          {TARGET_NOTES.map((note, i) => (
            <span
              key={note}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border font-serif text-sm",
                played.has(note)
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-border text-muted-foreground"
              )}
            >
              {TARGET_LABELS[i]}
            </span>
          ))}
        </div>
      </div>

      <PianoKeyboard
        startOctave={3}
        endOctave={5}
        highlightedNotes={remaining}
        activeNotes={Array.from(played)}
        onNotePlay={handleNotePlay}
        showLabels
        labelFilter={(note) => TARGET_NOTES.includes(note)}
        size="lg"
      />
    </div>
  );
}
