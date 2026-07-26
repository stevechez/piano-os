# PianoOS — Lesson Engine

**Document:** 39-lesson-engine.md
**Version:** 1.2 — engine componentized as LessonStep + LessonPlayer; lessons now hold one or more steps
**Status:** Foundation
**Created:** July 2026

---

# Purpose

This document defines the lesson engine: the system that renders a single PianoOS lesson.

It implements the lesson structure already defined in `04-curriculum-architecture.md`:

```
Concept
  ↓
Demonstration
  ↓
Practice
  ↓
Song Connection
```

The lesson engine is the first piece of PianoOS a new user actually touches. It is the answer to the MVP north star:

> "Can someone who has never used PianoOS understand the magic in the first 5 minutes?"

---

# Design Constraint

A lesson is not a video. It is not a page of text with a quiz at the end.

Each lesson is a small interactive experience — closer to a mini app than a course page. The user does something on a piano keyboard and hears/sees a result, every lesson.

---

# The Four Zones

A lesson is one or more **steps**. Every step screen has exactly four zones, always in this order:

## 1. Concept

"What are we learning?"

A short heading and 1-2 sentences. No jargon. States the idea before showing it.

## 2. Visual / Practice

The keyboard (or a chord/progression built from it). This is where the concept becomes something the user can see and touch. This zone and the interaction below it are rendered together — the visual *is* the interaction surface.

## 3. Interaction

The user does something specific and bounded: click a note, find all the Cs, play a chord, step through a progression. Each lesson defines exactly one interaction goal. The lesson does not advance until it's met.

## 4. Discovery

The "aha" moment, revealed only after the interaction is complete. States why what just happened matters, and ties it back to real music.

---

# Engine Components

Two components implement the four zones and sequencing, per `41-piano-component-spec.md`'s "build the engine once" philosophy:

- **`LessonStep`** — purely presentational. Renders one step's four zones (Concept, Visual/Interaction via `children`, Discovery) plus the shared progress bar. Knows nothing about what comes next.
- **`LessonPlayer`** — owns sequencing. Tracks which step of the current lesson is active, advances to the next step in place when a step's step isn't the lesson's last, and hands off to the next lesson (or `/learn/complete`) once it is. This is the reuse point: every lesson, no matter how many steps it eventually has, renders through the same `LessonPlayer`.

Two more components round out the reusable engine, per `41-piano-component-spec.md`:

- **`PianoKeyboard`** — the shared, interactive keyboard (hover/press feedback, keyboard-accessible, synthesized audio) that every step's Visual/Interaction zone is built on.
- **`ChordVisualizer`** — a compact "here's a chord" display (name, note letters, auto-ranged keyboard with the chord lit up) for anywhere a chord needs to be shown without a full interaction attached, e.g. `/learn/complete`'s recap.

---

# Lesson Data Model

Lesson and step *copy and metadata* are data-driven (per `26-technical-mvp-architecture.md`). Step *interactions* are small bespoke React components, registered per step id, because each one is a genuinely different mini experience — not a generic template.

```ts
interface LessonStepConfig {
  id: string;
  concept: { heading: string; body: string };
  discovery: { heading: string; body: string };
}

interface Lesson {
  id: string;
  index: number;
  title: string;
  steps: LessonStepConfig[];
}
```

Every Module 1 lesson has exactly one step today — `steps` exists so a future module can give a lesson several steps without any change to `LessonStep` or `LessonPlayer`, only to that lesson's data and its steps' interaction components.

The interaction component for the active step is looked up by step id at render time and receives a single `onComplete()` callback. It calls that callback once, when the user has met the step's goal. `LessonStep` reveals Discovery + Continue only after that happens; `LessonPlayer` decides where Continue goes next.

---

# Progress

Progress for this module is local-first: a completed lesson id is written to local storage the moment `onComplete()` fires. No account or backend is required to experience all five lessons.

Authentication and cloud persistence now exist in the product, but they sit *after* the module, not in front of it — see `42-mvp-user-flow.md` `/learn/complete`. An account is now created automatically at the moment of purchase (see `43-commerce-and-checkout.md`), not through a standalone signup form; whatever was completed anonymously syncs to that account automatically, so nothing is lost by not asking sooner.

---

# Explicitly Out of Scope (this pass)

- AI coach involvement in lessons
- Server-side progress persistence / accounts
- Branching or adaptive lesson paths
- More than 5 lessons

These stay deferred per `12-mvp-definition.md` and `26-technical-mvp-architecture.md` until the core loop — concept → touch the keyboard → aha moment — is proven.

---

# Decision Log

## Decision 001

**Decision:** Lesson content is data-driven; lesson interactions are hand-built components.

**Reason:** Copy changes constantly and should not require code changes. Interactions are each meaningfully different and don't compress into one generic template without losing the "mini app" feeling.

**Date:** July 2026

## Decision 002

**Decision:** Progress is local-first (browser storage) for this module, with no account requirement to complete it.

**Reason:** The MVP north star is a five-minute first impression. An account wall before the first "aha" moment works against that.

**Date:** July 2026

**Status note (reaffirmed):** A later build briefly required an account before `/learn` was reachable at all, in order to stand up authentication. That was a mistake in sequencing — it let the auth architecture drive the product instead of the other way around. `/learn` is public again; see `42-mvp-user-flow.md` Decision 002 for the full reasoning. PianoOS sells a transformation, not an account.

## Decision 003

**Decision:** Split the lesson shell into `LessonStep` (presentation) and `LessonPlayer` (sequencing), and give `Lesson` a `steps[]` array instead of flat `concept`/`reflection` fields.

**Reason:** Module 1 only ever needed one step per lesson, but later modules won't. Making this change now — while there are only five lessons to migrate — is far cheaper than retrofitting it once dozens of lessons exist. Every lesson keeps rendering through the same two components regardless of how many steps it has.

**Date:** July 2026
