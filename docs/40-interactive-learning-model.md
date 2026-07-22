# PianoOS — Interactive Learning Model

**Document:** 40-interactive-learning-model.md
**Version:** 1.0
**Status:** Foundation
**Created:** July 2026

---

# Purpose

This document defines how PianoOS teaches through direct interaction rather than passive content, and specifies the first five lessons of Module 1: Piano Foundations.

---

# Principle: Show, Touch, Hear, Understand

A traditional lesson explains, then tests.

PianoOS reverses this. The user acts first — clicks a note, plays a chord — and understanding follows from what they just heard and saw. This matches `03-learning-philosophy.md`: understanding before memorization.

Every lesson interaction must be:

- **Bounded** — one clear goal, not an open sandbox
- **Forgiving** — no wrong answers that end the lesson; the user can always retry
- **Immediate** — action produces sound and visual feedback with no delay

---

# Module 1: Piano Foundations — First Five Lessons

This is deliberately five lessons, not thirty. The goal is depth of first impression, not curriculum coverage. See `04-curriculum-architecture.md` Stage 1 for how this module continues after these five.

## Lesson 1 — Welcome to PianoOS

**Reframe:** not "here are the keys," but "you're about to learn how musicians see music."

**Interaction:** click C, E, and G on the keyboard, in any order.

**Reflection:** "This is C Major" — the user's first chord, without knowing it was coming.

## Lesson 2 — The Piano Is a Pattern Machine

**Goal:** remove fear of the keyboard's size. Teach that it's one repeating 12-note pattern, not 88 things to memorize.

**Interaction:** find every C across the visible range.

**Reflection:** the keyboard is a pattern, not a wall of keys.

## Lesson 3 — Your First Chord

**Goal:** the first real emotional win.

**Interaction:** play C, E, G again, then hear them together as a single chord.

**Reflection:** this exact chord appears in thousands of songs the user already knows.

## Lesson 4 — Chords Create Songs

**Goal:** show that a chord progression, not a melody, is what makes a song recognizable.

**Interaction:** step through C → G → Am → F and hear each chord.

**Reflection:** this is one of the most-used progressions in popular music.

## Lesson 5 — Play Your First Song

**Goal:** apply the same progression in a song context, so the user leaves having "played a song," not "finished a lesson."

**Interaction:** perform the same four-chord progression in sequence, framed as the opening of a real, recognizable song (chords only — no reproduced lyrics or sheet music).

**Reflection:** connects back to Lesson 4 — the same shape they just learned is a real song.

---

# Why This Order

Lessons 1-3 build one chord (C Major) three different ways: play it without context, understand the pattern behind it, then hear it as a chord. Lessons 4-5 zoom out from one chord to a progression to a song. The user experiences the full "Patterns → Chords → Songs" arc from the product positioning inside five minutes, using a single chord family.

---

# Interaction Contract

Every interaction component receives one prop: `onComplete: () => void`. It owns its own internal state (which notes have been played, which step of a progression is active) and calls `onComplete` exactly once, when its specific goal is met. It never calls it speculatively or on partial progress — the Reflection zone should always be a genuine payoff, not a technicality.

---

# Decision Log

## Decision 001

**Decision:** Build five lessons, all built around a single chord family (C Major → C-G-Am-F).

**Reason:** Depth over breadth for the first five minutes. Reusing one chord family across five lessons lets the user feel real mastery ("I know this chord now") rather than five shallow exposures to different ideas.

**Date:** July 2026
