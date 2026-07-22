"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playProgression } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

const PROGRESSION = getProgression("classicPop");
const CHORDS = PROGRESSION.chordIds.map(getChord);
const CHORD_DURATION_S = 1.1;
const GAP_MS = 150;
const STEP_MS = CHORD_DURATION_S * 1000 + GAP_MS;

export interface LessonInteractionProps {
  onComplete: () => void;
}

export function FirstSongInteraction({ onComplete }: LessonInteractionProps) {
  const [status, setStatus] = useState<"idle" | "playing" | "done">("idle");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePlay = () => {
    if (status === "playing") return;
    setStatus("playing");

    playProgression(
      CHORDS.map((c) => c.notes),
      { chordDuration: CHORD_DURATION_S, gapMs: GAP_MS }
    );

    CHORDS.forEach((_, i) => {
      window.setTimeout(() => setActiveIndex(i), i * STEP_MS);
    });

    window.setTimeout(() => {
      setActiveIndex(null);
      setStatus("done");
      onComplete();
    }, CHORDS.length * STEP_MS);
  };

  return (
    <div className="space-y-5">
      {PROGRESSION.songReference && (
        <p className="text-sm text-muted-foreground">
          These are the opening chords of{" "}
          <span className="text-foreground">
            &ldquo;{PROGRESSION.songReference.title}&rdquo;
          </span>{" "}
          by {PROGRESSION.songReference.artist}.
        </p>
      )}

      <PianoKeyboard
        startOctave={3}
        endOctave={5}
        highlightedNotes={activeIndex !== null ? CHORDS[activeIndex].notes : []}
        activeNotes={activeIndex !== null ? CHORDS[activeIndex].notes : []}
        size="lg"
      />

      <button
        type="button"
        onClick={handlePlay}
        disabled={status === "playing"}
        className={cn(
          "rounded-full px-7 py-3.5 text-sm font-medium transition-all",
          status === "playing"
            ? "cursor-not-allowed bg-secondary text-muted-foreground"
            : "bg-gold text-gold-foreground hover:scale-[1.02]"
        )}
      >
        {status === "idle" && "Play the song"}
        {status === "playing" && "Playing…"}
        {status === "done" && "Play it again"}
      </button>
    </div>
  );
}
