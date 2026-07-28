"use client";

import { useEffect, useState } from "react";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const ROUNDS: { chordId: string; answer: "major" | "minor" }[] = [
  { chordId: "dMajor", answer: "major" },
  { chordId: "eMinor", answer: "minor" },
];

/**
 * Two fixed rounds (not random — every other lesson in this codebase is
 * deterministic, and there's no reason for this one to be the exception).
 * A wrong guess isn't a failure state — just a nudge to listen again. See
 * docs/46-curriculum-authoring-guide.md.
 */
export function MajorOrMinorEarInteraction({ onComplete }: LessonInteractionProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const round = ROUNDS[roundIndex];
  const chord = getChord(round.chordId);

  useEffect(() => {
    playChord(chord.notes);
    setFeedback(null);
    // Only the round should retrigger the mystery chord, not every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex]);

  const handleGuess = (guess: "major" | "minor") => {
    if (guess === round.answer) {
      setFeedback("correct");
      window.setTimeout(() => {
        if (roundIndex === ROUNDS.length - 1) {
          onComplete();
        } else {
          setRoundIndex((i) => i + 1);
        }
      }, 900);
    } else {
      setFeedback("incorrect");
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Listen to the chord. Does it sound major or minor?
      </p>

      <div className="flex items-center justify-between rounded-3xl border border-border/80 bg-card/40 p-6">
        <span className="font-serif text-lg text-foreground">
          Mystery chord {roundIndex + 1} of {ROUNDS.length}
        </span>
        <button
          type="button"
          onClick={() => playChord(chord.notes)}
          className="rounded-full border border-border/80 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Play it again
        </button>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleGuess("major")}
          className={cn(
            "flex-1 rounded-full border px-6 py-3 text-sm font-medium transition-all",
            feedback === "correct" && round.answer === "major"
              ? "border-gold bg-gold/15 text-foreground"
              : "border-border/80 text-foreground hover:border-gold/50"
          )}
        >
          Sounds Major
        </button>
        <button
          type="button"
          onClick={() => handleGuess("minor")}
          className={cn(
            "flex-1 rounded-full border px-6 py-3 text-sm font-medium transition-all",
            feedback === "correct" && round.answer === "minor"
              ? "border-gold bg-gold/15 text-foreground"
              : "border-border/80 text-foreground hover:border-gold/50"
          )}
        >
          Sounds Minor
        </button>
      </div>

      {feedback === "incorrect" && (
        <p className="text-sm text-gold">
          Not quite — play it again, then take another guess.
        </p>
      )}
      {feedback === "correct" && (
        <p className="text-sm text-gold">
          That's {chord.name} — you heard it correctly.
        </p>
      )}
    </div>
  );
}
