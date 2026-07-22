"use client";

/**
 * Minimal synthesized piano playback via the Web Audio API. No sample
 * libraries or audio assets — see docs/41-piano-component-spec.md Decision
 * 001. A single AudioContext is created lazily on first use, to respect
 * browser autoplay policies (it must be created/resumed inside a user
 * gesture, which a key click satisfies).
 */

import { noteToFrequency } from "@/lib/music/notes";

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!sharedContext) {
    const Ctor =
      window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!Ctor) return null;
    sharedContext = new Ctor();
  }

  if (sharedContext.state === "suspended") {
    void sharedContext.resume();
  }

  return sharedContext;
}

export interface PlayNoteOptions {
  /** Seconds. */
  duration?: number;
  /** Peak gain, 0-1. */
  velocity?: number;
  /** Seconds from now to schedule the note. */
  when?: number;
}

export function playNote(note: string, options: PlayNoteOptions = {}): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const { duration = 0.9, velocity = 0.35, when = 0 } = options;
  const startTime = ctx.currentTime + when;
  const frequency = noteToFrequency(note);

  const oscillator = ctx.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.value = frequency;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(velocity, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

export interface PlayChordOptions {
  duration?: number;
  /** Milliseconds between each note's start, for a light "strum" feel. */
  strumMs?: number;
}

export function playChord(notes: string[], options: PlayChordOptions = {}): void {
  const { duration = 1.4, strumMs = 18 } = options;
  notes.forEach((note, i) => {
    playNote(note, { duration, when: (i * strumMs) / 1000 });
  });
}

export interface PlayProgressionOptions {
  chordDuration?: number;
  gapMs?: number;
}

/** Plays a sequence of chords, one after another. */
export function playProgression(
  chordsNotes: string[][],
  options: PlayProgressionOptions = {}
): void {
  const { chordDuration = 1.1, gapMs = 150 } = options;
  let offset = 0;

  for (const notes of chordsNotes) {
    notes.forEach((note, i) => {
      playNote(note, { duration: chordDuration, when: offset + (i * 18) / 1000 });
    });
    offset += chordDuration + gapMs / 1000;
  }
}
