"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { generateNoteRange, type KeyboardNote } from "@/lib/music/notes";
import { playNote } from "@/lib/audio/piano-synth";

export interface PianoKeyboardProps {
  /** Lowest octave shown (the C it starts on). Default 3. */
  startOctave?: number;
  /** Highest octave shown (the C it ends on, inclusive). Default 6. */
  endOctave?: number;
  /** Notes to visually call out as a target, without marking them played. */
  highlightedNotes?: string[];
  /** Notes to show as already satisfied/played (persistent, gold fill). */
  activeNotes?: string[];
  /** Called every time a key is pressed, in addition to playing sound. */
  onNotePlay?: (note: string) => void;
  /** Print note names on keys. */
  showLabels?: boolean;
  /** Restrict which notes get a label when showLabels is true. */
  labelFilter?: (note: string) => boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_HEIGHT: Record<NonNullable<PianoKeyboardProps["size"]>, string> = {
  sm: "h-28",
  md: "h-40",
  lg: "h-52",
};

/**
 * How long a key's gold "ring-out" glow takes to fade after release, in ms.
 * Loosely echoes the synth's own decay envelope (see piano-synth.ts) so the
 * visual and the sound settle together, rather than the key snapping off
 * well before the note actually finishes ringing.
 */
const RING_DECAY_MS = 550;

export function PianoKeyboard({
  startOctave = 3,
  endOctave = 6,
  highlightedNotes,
  activeNotes,
  onNotePlay,
  showLabels = false,
  labelFilter,
  size = "md",
  className,
}: PianoKeyboardProps) {
  const [ringingNotes, setRingingNotes] = useState<Set<string>>(new Set());

  const notes = useMemo(
    () => generateNoteRange(startOctave, endOctave),
    [startOctave, endOctave]
  );

  const whiteNotes = useMemo(() => notes.filter((n) => !n.isSharp), [notes]);
  const totalWhite = whiteNotes.length;

  const blackKeys = useMemo(() => {
    let whiteCount = 0;
    const keys: { note: KeyboardNote; boundaryIndex: number }[] = [];
    for (const note of notes) {
      if (note.isSharp) {
        keys.push({ note, boundaryIndex: whiteCount });
      } else {
        whiteCount += 1;
      }
    }
    return keys;
  }, [notes]);

  const highlightedSet = useMemo(
    () => new Set(highlightedNotes ?? []),
    [highlightedNotes]
  );
  const activeSet = useMemo(() => new Set(activeNotes ?? []), [activeNotes]);

  function handlePress(note: string) {
    playNote(note);
    setRingingNotes((prev) => new Set(prev).add(note));
    window.setTimeout(() => {
      setRingingNotes((prev) => {
        if (!prev.has(note)) return prev;
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    }, RING_DECAY_MS);
    onNotePlay?.(note);
  }

  const whiteKeyWidthPercent = 100 / totalWhite;
  const blackKeyWidthPercent = whiteKeyWidthPercent * 0.62;

  return (
    <div
      role="group"
      aria-label="Piano keyboard"
      className={cn(
        "relative flex w-full select-none overflow-hidden rounded-xl border border-border/80 bg-secondary/40",
        SIZE_HEIGHT[size],
        className
      )}
    >
      {whiteNotes.map((note) => {
        const isHighlighted = highlightedSet.has(note.id);
        const isActive = activeSet.has(note.id);
        const isRinging = ringingNotes.has(note.id);
        const label = note.pitch === "C" ? `${note.pitch}${note.octave}` : note.pitch;
        const shouldLabel = showLabels && (!labelFilter || labelFilter(note.id));

        return (
          <button
            key={note.id}
            type="button"
            aria-label={`Play ${note.id}`}
            aria-pressed={isActive || isRinging}
            onClick={() => handlePress(note.id)}
            className={cn(
              "relative flex-1 border-r border-border/60 bg-foreground/95 last:border-r-0",
              "flex items-end justify-center pb-2",
              "transition-transform duration-100 ease-out",
              "hover:brightness-110 active:translate-y-0.5 active:brightness-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 bg-gold transition-opacity ease-out",
                isActive && "opacity-100 duration-150",
                !isActive && isRinging && "opacity-70 duration-75",
                !isActive && !isRinging && isHighlighted && "animate-key-glow",
                !isActive && !isRinging && !isHighlighted && "opacity-0 duration-500"
              )}
            />
            {isHighlighted && !isActive && (
              <span className="pointer-events-none absolute inset-x-1 top-1 h-1.5 rounded-full bg-gold animate-key-marker" />
            )}
            {shouldLabel && (
              <span
                className={cn(
                  "relative pointer-events-none text-[10px] font-medium tracking-wide",
                  isActive || isRinging ? "text-gold-foreground" : "text-background/50"
                )}
              >
                {label}
              </span>
            )}
          </button>
        );
      })}

      {blackKeys.map(({ note, boundaryIndex }) => {
        const isHighlighted = highlightedSet.has(note.id);
        const isActive = activeSet.has(note.id);
        const isRinging = ringingNotes.has(note.id);

        return (
          <button
            key={note.id}
            type="button"
            aria-label={`Play ${note.id}`}
            aria-pressed={isActive || isRinging}
            onClick={() => handlePress(note.id)}
            style={{
              left: `${(boundaryIndex / totalWhite) * 100}%`,
              width: `${blackKeyWidthPercent}%`,
            }}
            className={cn(
              "absolute top-0 z-10 h-[60%] -translate-x-1/2 rounded-b-md bg-[oklch(0.08_0.008_58)]",
              "transition-transform duration-100 ease-out",
              "hover:brightness-125 active:translate-y-0.5 active:brightness-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 rounded-b-md bg-gold transition-opacity ease-out",
                isActive && "opacity-100 duration-150",
                !isActive && isRinging && "opacity-80 duration-75",
                !isActive && !isRinging && isHighlighted && "animate-key-glow",
                !isActive && !isRinging && !isHighlighted && "opacity-0 duration-500"
              )}
            />
            {isHighlighted && !isActive && (
              <span className="pointer-events-none absolute inset-x-0 bottom-1.5 mx-auto h-1 w-1/2 rounded-full bg-gold animate-key-marker" />
            )}
          </button>
        );
      })}
    </div>
  );
}
