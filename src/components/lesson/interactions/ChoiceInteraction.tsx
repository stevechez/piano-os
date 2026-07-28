"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ChoiceOption {
  id: string;
  label: string;
  play: () => void;
}

export interface ChoiceInteractionProps {
  options: ChoiceOption[];
  prompt: string;
  onComplete: () => void;
}

/**
 * "Try each of several musical options, then discover there's no wrong
 * choice" — unlike every prior interaction, nothing here is right or
 * wrong. The student can click any option, in any order, as many times as
 * they want. Completion fires once every option has been heard at least
 * once. Powers most of Module 3, whose whole premise is creative choice,
 * not a correct answer. See docs/46-curriculum-authoring-guide.md.
 */
export function ChoiceInteraction({ options, prompt, onComplete }: ChoiceInteractionProps) {
  const [tried, setTried] = useState<Set<string>>(new Set());
  const doneRef = useRef(false);

  const handleTry = (option: ChoiceOption) => {
    option.play();

    if (tried.has(option.id)) return;

    const next = new Set(tried);
    next.add(option.id);
    setTried(next);

    if (next.size === options.length && !doneRef.current) {
      doneRef.current = true;
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{prompt}</p>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isTried = tried.has(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleTry(option)}
              className={cn(
                "flex-1 basis-[160px] rounded-2xl border px-5 py-6 text-left transition-all",
                isTried
                  ? "border-gold/40 bg-gold/10 text-foreground"
                  : "border-border/80 text-foreground hover:scale-[1.01] hover:border-gold/50 hover:bg-card/50"
              )}
            >
              <div className="font-serif text-lg">{option.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {isTried ? "Heard it — try again anytime" : "Tap to hear it"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
