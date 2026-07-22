# PianoOS — Lesson Engine

**Document:** 39-lesson-engine.md
**Version:** 1.1 — Decision 002 reaffirmed after a since-reverted detour; see below
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

Every lesson screen has exactly four zones, always in this order:

## 1. Concept

"What are we learning?"

A short heading and 1-2 sentences. No jargon. States the idea before showing it.

## 2. Visual / Practice

The keyboard (or a chord/progression built from it). This is where the concept becomes something the user can see and touch. This zone and the interaction below it are rendered together — the visual *is* the interaction surface.

## 3. Interaction

The user does something specific and bounded: click a note, find all the Cs, play a chord, step through a progression. Each lesson defines exactly one interaction goal. The lesson does not advance until it's met.

## 4. Reflection

The "aha" moment, revealed only after the interaction is complete. States why what just happened matters, and ties it back to real music.

---

# Lesson Data Model

Lesson *copy and metadata* are data-driven (per `26-technical-mvp-architecture.md`). Lesson *interactions* are small bespoke React components, registered per lesson, because each one is a genuinely different mini experience — not a generic template.

```ts
interface Lesson {
  id: string;
  index: number;
  title: string;
  concept: { heading: string; body: string };
  reflection: { heading: string; body: string };
}
```

The interaction component is looked up by lesson id at render time and receives a single `onComplete()` callback. It calls that callback once, when the user has met the lesson's goal. The shell reveals Reflection + Continue only after that happens.

---

# Progress

Progress for this module is local-first: a completed lesson id is written to local storage the moment `onComplete()` fires. No account or backend is required to experience all five lessons.

Authentication and cloud persistence now exist in the product, but they sit *after* the module, not in front of it — see `42-mvp-user-flow.md` `/learn/complete`. When someone does sign up, whatever they completed anonymously syncs to their account automatically; nothing is lost by not asking sooner.

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
