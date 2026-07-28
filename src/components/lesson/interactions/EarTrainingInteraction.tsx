"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface EarTrainingOption {
  id: string;
  label: string;
}

export interface EarTrainingRound {
  play: () => void;
  options: EarTrainingOption[];
  answerId: string;
}

export interface EarTrainingInteractionProps {
  prompt: string;
  rounds: EarTrainingRound[];
  onComplete: () => void;
}

/**
 * Listen, then guess from a fixed set of labeled options — a wrong guess
 * isn't a failure state, just a nudge to listen again. Generalizes the
 * shape Module 3's bespoke MajorOrMinorEarInteraction used once; Module
 * 11 needs this same "listen and identify" mechanic repeatedly, which is
 * the genuine-second-repetition threshold this codebase extracts a
 * shared primitive at (see docs/46-curriculum-authoring-guide.md).
 * MajorOrMinorEarInteraction itself is left as-is, not refactored onto
 * this primitive -- it already works and wasn't asked to change.
 */
export function EarTrainingInteraction({ prompt, rounds, onComplete }: EarTrainingInteractionProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const round = rounds[roundIndex];

  useEffect(() => {
    round.play();
    setFeedback(null);
    // Only the round should retrigger playback, not every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex]);

  const handleGuess = (guessId: string) => {
    if (guessId === round.answerId) {
      setFeedback("correct");
      window.setTimeout(() => {
        if (roundIndex === rounds.length - 1) {
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
      <p className="text-sm text-muted-foreground">{prompt}</p>

      <div className="flex items-center justify-between rounded-3xl border border-border/80 bg-card/40 p-6">
        <span className="font-serif text-lg text-foreground">
          Round {roundIndex + 1} of {rounds.length}
        </span>
        <button
          type="button"
          onClick={() => round.play()}
          className="rounded-full border border-border/80 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Play it again
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {round.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleGuess(option.id)}
            className={cn(
              "flex-1 basis-[140px] rounded-full border px-6 py-3 text-sm font-medium transition-all",
              feedback === "correct" && option.id === round.answerId
                ? "border-gold bg-gold/15 text-foreground"
                : "border-border/80 text-foreground hover:border-gold/50"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {feedback === "incorrect" && (
        <p className="text-sm text-gold">Not quite — play it again, then take another guess.</p>
      )}
      {feedback === "correct" && (
        <p className="text-sm text-gold">That's it — you heard it correctly.</p>
      )}
    </div>
  );
}
