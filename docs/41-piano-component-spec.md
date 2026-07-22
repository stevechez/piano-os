# PianoOS — Piano Component Spec

**Document:** 41-piano-component-spec.md
**Version:** 1.0
**Status:** Foundation
**Created:** July 2026

---

# Purpose

This document specifies the shared `PianoKeyboard` component — the single most reused piece of UI in the product. Every lesson, and eventually every song and practice screen, renders through this component.

---

# Requirements

- Renders a configurable range of octaves (default: C3–C6)
- Standard piano layout: white keys in a row, black keys positioned between the correct white keys
- Clickable/tappable keys that report the note played
- Produces real, synthesized sound on click (see Audio, below) — silent keyboards undercut the "hear it" half of every lesson
- Can visually highlight a set of notes (a "target" a lesson wants the user to find or play) independent of what the user has actually played
- Works at multiple sizes (compact for a lesson card, larger for a full lesson view)
- No installed audio sample libraries or external audio assets for this pass — see Decision 001

---

# Props

```ts
interface PianoKeyboardProps {
  startOctave?: number;      // default 3
  endOctave?: number;        // default 6 (inclusive top C)
  highlightedNotes?: string[]; // notes to visually call out (e.g. "find the Cs")
  activeNotes?: string[];      // notes to show as already-satisfied/played
  onNotePlay?: (note: string) => void;
  showLabels?: boolean;        // print note names on keys
  labelFilter?: (note: string) => boolean; // restrict labels (e.g. only Cs)
  size?: "sm" | "md" | "lg";
}
```

Note format: scientific pitch notation, e.g. `"C4"`, `"F#3"`.

---

# Layout Algorithm

Standard web piano technique:

1. Generate the ordered list of white-key notes across the octave range.
2. Render them as equal-width flex children in a row — this defines the coordinate system.
3. For each white key that is followed by a sharp before the next white key (every pair except E→F and B→C), render an absolutely-positioned black key centered on the boundary between that white key and the next.

This avoids hardcoded pixel widths and stays responsive at any container size.

---

# Audio

## Approach: synthesized, not sampled

Notes are played with the Web Audio API — an oscillator (triangle wave, for a softer, less buzzy tone than a square/saw wave) through a short attack/decay gain envelope. No audio files are loaded.

```
noteToFrequency(note) → frequency (Hz)
playNote(note, duration) → schedules oscillator + envelope on a shared AudioContext
playChord(notes[], options) → plays multiple notes together (or lightly staggered, for a "strummed" feel)
```

The `AudioContext` is created lazily, on the first user interaction, to respect browser autoplay policies.

## Frequency calculation

Standard equal-temperament formula relative to A4 = 440 Hz, using each note's MIDI number:

```
midi = (octave + 1) * 12 + noteIndex   // C4 = MIDI 60
frequency = 440 * 2 ^ ((midi - 69) / 12)
```

---

# Visual Language

Matches the existing dark "private piano studio" design system (`28-design-system-and-user-interface.md`):

- White keys: warm off-white (`--foreground`-derived), dark surface for the keyboard bed
- Black keys: near-black, slightly elevated
- Highlighted (target) notes: a soft gold ring/glow (`--gold`) — never a bright, game-like color
- Played/active notes: filled gold, briefly, on press
- No skeuomorphic 3D key shading, no cartoon styling — flat, precise, calm

---

# Decision Log

## Decision 001

**Decision:** Use synthesized audio (Web Audio API oscillators) rather than sampled piano audio for this pass.

**Reason:** Zero asset weight, zero external audio library dependency, works instantly with no loading state — important for a "first five minutes" experience. Sound quality is a legitimate future upgrade once the learning loop is validated, not a blocker to shipping it.

**Date:** July 2026

## Decision 002

**Decision:** One shared `PianoKeyboard` component, configured via props, rather than a different keyboard implementation per lesson.

**Reason:** The keyboard is the product's core visual metaphor. It must look and behave identically everywhere it appears.

**Date:** July 2026
