"use client";

import { useMemo, useState } from "react";
import { PianoKeyboard } from "@/components/piano/PianoKeyboard";
import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { cn } from "@/lib/utils";

export interface PlayProgressionInteractionProps {
  progressionId: string;
  onComplete: () => void;
}

/** Pause after a chord completes, before revealing the next one. */
const ADVANCE_DELAY_MS = 700;

/**
 * The student plays every chord of a progression themselves, one at a
 * time, on the keyboard — not a button that plays it for them. Extracted
 * from onboarding's FirstSongInteraction once Module 2 needed the same
 * mechanic for a second progression. See docs/47-first-user-test-results.md
 * for why this must require real playing, not auto-play.
 */
export function PlayProgressionInteraction({
  progressionId,
  onComplete,
}: PlayProgressionInteractionProps) {
  const progression = useMemo(() => getProgression(progressionId), [progressionId]);
  const chords = useMemo(
    () => progression.chordIds.map(getChord),
    [progression]
  );

  const [chordIndex, setChordIndex] = useState(0);
  const [playedInChord, setPlayedInChord] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const currentChord = chords[chordIndex];
  const lastChord = chords[chords.length - 1];

  const handleNotePlay = (note: string) => {
    if (done || !currentChord.notes.includes(note) || playedInChord.has(note)) {
      return;
    }

    const next = new Set(playedInChord);
    next.add(note);
    setPlayedInChord(next);

    if (next.size !== currentChord.notes.length) return;

    playChord(currentChord.notes);

    if (chordIndex === chords.length - 1) {
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
      <p className="text-sm text-muted-foreground">
        {progression.songReference && (
          <>
            These are the opening chords of{" "}
            <span className="text-foreground">
              &ldquo;{progression.songReference.title}&rdquo;
            </span>{" "}
            by {progression.songReference.artist}.{" "}
          </>
        )}
        Play each chord yourself, in order —{" "}
        <span className="text-foreground">{progression.label}</span>.
        {!done && (
          <>
            {" "}
            Chord {chordIndex + 1} of {chords.length}:{" "}
            <span className="text-foreground">{currentChord.name}</span>.
          </>
        )}
      </p>

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
