# PianoOS — Curriculum Authoring Guide

**Document:** 46-curriculum-authoring-guide.md
**Version:** 1.0
**Status:** Reference
**Created:** July 2026

---

# Purpose

This document exists so that anyone creating a future PianoOS lesson — a curriculum writer, a future engineer, a future version of this same conversation — can do it correctly without re-reading the project's history.

It answers five questions:

1. What does PianoOS teach?
2. How does PianoOS teach?
3. How are lessons structured?
4. What content already exists?
5. What should not be built yet?

This document is about curriculum creation only. It does not cover deployment, infrastructure, or business operations.

---

# 1. Pedagogical Foundations

Before writing a single lesson, read:

- **CLAUDE.md** — "PianoOS Core Principles," the standing checklist for every decision.
- **`00-product-principles.md`** — the fifteen founding principles and the Product Decision Filter.
- **`01-product-vision.md`** — who this is for and why traditional methods fail them.
- **`02-customer-persona.md`** — the Stuck Adult Musician. Every lesson is written for this person, not a hypothetical beginner of any age.
- **`03-learning-philosophy.md`** and **`04-curriculum-architecture.md`** — the Concept → Demonstration → Practice → Song Connection shape every lesson descends from.

Do not write curriculum from memory of these documents. Re-read them. They are the source of truth, and they override this guide if the two ever conflict.

---

## The Five Non-Negotiable Rules

Every lesson, without exception, follows these. If a lesson idea can't satisfy all five, it isn't ready to build.

### Understanding Before Memorization

A student should never be told *what* to do without first knowing *why*. If a lesson can be completed by rote pattern-matching without the student grasping the underlying idea, it has failed — regardless of how smooth the interaction feels.

### Patterns Before Notation

PianoOS does not teach sheet music as a starting point. Every concept is introduced as a visual/physical pattern on the keyboard first. Notation, if it ever appears, comes after the pattern is already understood.

### Chords Before Scales

Harmony is the entry point, not scales or technical exercises. A student should be making chords — and hearing why they matter — long before any lesson asks them to run a scale.

### Songs And Musical Context Before Isolated Exercises

A concept is introduced through where it shows up in real music, not as an abstract drill to be mastered before it's useful. If a lesson teaches a concept with no connection to a song or a real musical outcome, it's missing its second half.

### Discovery Before Explanation

The student does something on the keyboard first, and the explanation of *why it worked* comes after, as the reward — never the reverse. This is the entire premise of the Concept → Interaction → Discovery shape (see Section 2). A lesson that explains a concept and then asks the student to demonstrate it has the order backwards.

---

# 2. Lesson Authoring Model

## The Hierarchy

```
Module
  |
  ├── Lesson 1
  |       |
  |       ├── Step 1
  |       └── Step 2
  |
  ├── Lesson 2
  |
  └── Lesson 8
```

- **Onboarding** (the five free lessons) is a flat `Lesson[]` — it is not a Module. See `44-learning-curriculum-architecture.md` Decision 001.
- **Modules** are the paid Learning Curriculum's unit above a lesson. Module 1 is "Piano Foundations."
- **Lessons** have one or more **Steps**. A step is the atomic unit a student actually experiences.

Full background: `39-lesson-engine.md` (the engine itself) and `44-learning-curriculum-architecture.md` (Module/Lesson/Step, why one engine serves both onboarding and curriculum).

## The Four Zones (every step, always, in this order)

1. **Concept** — one short heading, 1–2 plain-language sentences. States the idea before showing it.
2. **Visual / Interaction** — the keyboard, or a chord/progression built from it. This is where the student *does* something.
3. **Interaction** — a single, bounded goal (find these notes, play this chord, step through this progression). The step does not advance until the goal is met.
4. **Discovery** — revealed only after the interaction completes. States why what just happened matters, tying it back to real music.

This is Discovery Before Explanation, structurally enforced — the copy for zone 4 does not exist to the student until zone 3 is satisfied.

## Where Content Lives

- **Copy and metadata are data**, not code. A step's `concept` and `discovery` text lives as a `LessonStepConfig` object (`src/features/curriculum/types.ts`):

```ts
interface LessonStepConfig {
  id: string;
  concept: { heading: string; body: string };
  discovery: { heading: string; body: string };
}
```

- Onboarding's lessons live in `src/features/curriculum/onboarding.ts`. A module's lessons live in `src/features/curriculum/modules.ts` (Module 1 today; a Module 2 file/export would follow the same shape).
- **Adding or editing a lesson's copy never requires touching the interaction components.** Changing the words a student reads is a data-only change.

## How Interactions Are Selected

A step's Visual/Interaction zone is a React component, registered by **step id** in `src/components/lesson/interactions/index.ts`:

```ts
export const LESSON_INTERACTIONS: Record<string, ComponentType<LessonInteractionProps>> = {
  "welcome-to-pianoos": WelcomeInteraction,
  "pattern-machine": PatternMachineInteraction,
  // ...
  "keyboard-patterns-pairs": BlackKeyPairsInteraction,
  "finding-notes": FindingNotesInteraction,
};
```

`LessonPlayer` looks up the active step's interaction by id and renders it with a single `onComplete()` callback. The interaction calls that callback once, when its goal is met — nothing else about sequencing is its concern.

### When To Reuse An Existing Interaction

One interaction *shape* — "find every one of these notes on the keyboard" — already recurs three times (onboarding's `pattern-machine`, Module 1's black-key-group steps, Module 1's `finding-notes`). It's implemented once, in `FindNotesInteraction` (`src/components/lesson/interactions/FindNotesInteraction.tsx`), and every lesson that needs it writes a thin wrapper supplying the target notes and prompt copy.

**Reuse `FindNotesInteraction` whenever a lesson's interaction is genuinely "click every X on the keyboard."** That covers finding a pitch class, finding a landmark group, finding an interval pattern, and similar. Write a small wrapper component (10–20 lines) rather than duplicating the click-tracking logic.

### When A New Interaction Is Justified

Write a new, bespoke interaction when the mechanic is genuinely different — playing a chord and listening to it, stepping through a progression in order, comparing two sounds, anything that isn't "find these notes." `39-lesson-engine.md` Decision 001 is explicit about this: interactions are hand-built per genuinely-different mechanic, not compressed into one generic template. **Do not build a generic, configurable "lesson interaction" system.** If a new lesson idea seems to need one, that's a signal the idea should be split into a mechanic PianoOS already has plus a new one, not a signal to add configuration options to an existing component.

## Worked Example: Module 1, Lessons 1 and 2

**Lesson 1 — "Keyboard Patterns"** (`src/features/curriculum/modules.ts`) has two steps, because it teaches two related-but-distinct shapes:

- Step `keyboard-patterns-pairs`: concept explains black keys cluster in twos and threes; interaction is `BlackKeyPairsInteraction`, a wrapper around `FindNotesInteraction` with `targetNotes = notesInBlackKeyGroup(range, 2)`; discovery explains the "C sits left of every pair" landmark.
- Step `keyboard-patterns-triplets`: same shape, `groupSize = 3`, discovery generalizes to "two shapes, that's the whole keyboard."

**Lesson 2 — "Finding Notes"** has one step (`finding-notes`): concept tells the student to use the triplet landmark they just learned to find every F; interaction is `FindingNotesInteraction`, a wrapper around `FindNotesInteraction` with `targetNotes = notesOfPitchClass(range, "F")`; discovery generalizes the skill — pattern recognition instead of counting.

Notice what each new lesson actually required:
- A `Lesson` entry with 1+ `LessonStepConfig` objects (pure data).
- One or two thin interaction wrapper components (10–20 lines each), reusing `FindNotesInteraction`.
- One registry entry per step id.

No changes to `LessonPlayer`, `LessonStep`, `PianoKeyboard`, or the progress system. This is the bar for how cheap a new lesson should be when it reuses an existing interaction shape.

---

# 3. Current Curriculum Inventory

## BUILT

**PianoOS Onboarding** (free, not a Module — `src/features/curriculum/onboarding.ts`):

1. Welcome to PianoOS
2. The Piano Is a Pattern Machine
3. Your First Chord
4. Chords Create Songs
5. Play Your First Song

**Module 1: Piano Foundations** (paid — `src/features/curriculum/modules.ts`):

1. Keyboard Patterns (2 steps)
2. Finding Notes (1 step)

That is the entire built curriculum as of this document. Nothing beyond these seven experiences exists in the product today.

## PLANNED (not built — do not treat as existing)

A suggested sequence for the remainder of Module 1, per the original Phase 7 handoff. Titles and order may evolve; none of this content, copy, or interaction has been written:

3. Octaves
4. Intervals
5. Building Chords
6. Major vs Minor
7. Recognizing Progressions
8. Module Review

Module 2 and beyond are not yet named or scoped.

---

# 4. Validation Gate

> ## STOP.
>
> **Do not create Module 1 Lessons 3–8 until:**
>
> ✓ Stripe Price IDs are fixed
>
> ✓ Purchase flow works end-to-end
>
> ✓ First external user test is completed
>
> ✓ Feedback is reviewed
>
> **The next milestone is validation, not curriculum expansion.**
>
> The goal is not to create more lessons.
>
> The goal is to prove that the first learning experience creates a transformation.

If you are reading this document and considering writing Lesson 3, check the four boxes above first. If they aren't checked, the correct next action is to help get them checked — not to write curriculum.

---

# Decision Log

## Decision 001

**Decision:** This guide is scoped to curriculum creation only — pedagogy, lesson structure, content inventory, and the validation gate. It intentionally excludes engineering setup, deployment, and business operations.

**Reason:** Curriculum authors (who may not be engineers) and engineers extending curriculum have different needs from a handoff document. Mixing the two produces a document that serves neither well. An engineering handoff, if needed, is a separate document.

**Date:** July 2026
