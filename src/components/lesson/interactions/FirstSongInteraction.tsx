"use client";

import { useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

const PROGRESSION = getProgression("classicPop");
const CHORDS = PROGRESSION.chordIds.map(getChord);
/** Pause after a chord completes, before revealing the next one — long
 * enough to hear it land, short enough to keep momentum. */
const ADVANCE_DELAY_MS = 700;

export interface LessonInteractionProps {
  onComplete: () => void;
}

/**
 * The student plays every chord of the progression themselves, one at a
 * time, on the keyboard — not a single button that plays it for them. See
 * docs/47-first-user-test-results.md: the previous auto-play version
 * contradicted its own Discovery copy ("you played it").
 */
export function FirstSongInteraction({ onComplete }: LessonInteractionProps) {
  const [chordIndex, setChordIndex] = useState(0);
  const [playedInChord, setPlayedInChord] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const currentChord = CHORDS[chordIndex];
  const lastChord = CHORDS[CHORDS.length - 1];

  const handleNotePlay = (note: string) => {
    if (done || !currentChord.notes.includes(note) || playedInChord.has(note)) {
      return;
    }

    const next = new Set(playedInChord);
    next.add(note);
    setPlayedInChord(next);

    if (next.size !== currentChord.notes.length) return;

    playChord(currentChord.notes);

    if (chordIndex === CHORDS.length - 1) {
      setDone(true);
      onComplete();
    } else {
      window.setTimeout(() => {
        setChordIndex((i) => i + 1);
        setPlayedInChord(new Set());
      }, ADVANCE_DELAY_MS);
    }
  };

  const handleReplay = () => {
    setChordIndex(0);
    setPlayedInChord(new Set());
    setDone(false);
  };

  return (
    <div className="space-y-5">
      {PROGRESSION.songReference && (
        <p className="text-sm text-muted-foreground">
          These are the opening chords of{" "}
          <span className="text-foreground">
            &ldquo;{PROGRESSION.songReference.title}&rdquo;
          </span>{" "}
          by {PROGRESSION.songReference.artist}. Play each chord yourself, in
          order —{" "}
          <span className="text-foreground">{PROGRESSION.label}</span>.
          {!done && (
            <>
              {" "}
              Chord {chordIndex + 1} of {CHORDS.length}:{" "}
              <span className="text-foreground">{currentChord.name}</span>.
            </>
          )}
        </p>
      )}

      <PianoKeyboard
        startOctave={3}
        endOctave={5}
        highlightedNotes={
          done ? [] : currentChord.notes.filter((n) => !playedInChord.has(n))
        }
        activeNotes={done ? lastChord.notes : Array.from(playedInChord)}
        onNotePlay={handleNotePlay}
        size="lg"
      />

      {done && (
        <button
          type="button"
          onClick={handleReplay}
          className={cn(
            "rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-gold-foreground",
            "transition-transform hover:scale-[1.02]"
          )}
        >
          Play it again
        </button>
      )}
    </div>
  );
}
