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

## A Second Reuse Example: Octaves And Intervals

Lessons 3 and 4 introduced a second recurring shape: "click a note, then find the note exactly N semitones away." Rather than building two one-off interactions, this became `IntervalPairInteraction` (parametrized by `semitones`), with `OctavePairInteraction` (12 semitones) and `FifthPairInteraction` (7 semitones) as thin wrappers — the same extraction pattern as `FindNotesInteraction`, applied the second time the pattern showed up rather than pre-built speculatively the first time. That ordering — build bespoke, extract on genuine repetition — is the rule, not a one-time exception.

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
3. Octaves (1 step)
4. Intervals (1 step)
5. The Major Scale (1 step)
6. Building Any Major Chord (1 step)
7. Major vs Minor (2 steps)
8. Every Chord You Need (3 steps)

Module 1 is now feature-complete at 8 lessons. Lessons 5–8 were built under an explicit gate override — see Decision 003 below — not because the validation gate was satisfied.

## PLANNED (not built — do not treat as existing)

Module 2 and beyond are not yet named or scoped.

---

# 4. Validation Gate

Status, updated as each item clears:

✓ Stripe Price IDs are fixed

✓ Purchase flow works end-to-end

✓ A **simulated** first user test was run (`47-first-user-test-results.md`) — surfaced real findings (a landing-page gap, a Lesson 5 content/mechanic contradiction) that were acted on directly, and Lessons 3–4 were built as a deliberate, explicit exception to extend the "aha" experience before real testing, per product direction.

⚠ Lessons 5–8 were built via an **explicit founder override** of this gate (Decision 003) — not because a real external test happened. Module 1's *existence* is complete; whether this specific theory content (scale construction, chord formulas, major/minor) actually lands for a real beginner is still unverified.

> ## STOP.
>
> **Do not start Module 2, and do not treat Module 1 as validated content, until:**
>
> ✓ A **real** external user test is completed (`45-first-user-test-script.md` — the simulation in `47` does not satisfy this)
>
> ✓ Its feedback is reviewed — specifically watching whether Lessons 5–8's theory density (scales, chord formulas) lands for a genuine beginner, or overshoots the persona the same way the founder's own "elementary" reaction may have undershot Lessons 1–4
>
> **The next milestone is still validation.** Building Lessons 5–8 answered "can PianoOS teach this content at all" — it did not answer "does a real beginner want this much theory this early," which remains open.

If you are reading this document and considering starting Module 2, check the two boxes above first.

---

# Decision Log

## Decision 001

**Decision:** This guide is scoped to curriculum creation only — pedagogy, lesson structure, content inventory, and the validation gate. It intentionally excludes engineering setup, deployment, and business operations.

**Reason:** Curriculum authors (who may not be engineers) and engineers extending curriculum have different needs from a handoff document. Mixing the two produces a document that serves neither well. An engineering handoff, if needed, is a separate document.

**Date:** July 2026

## Decision 002

**Decision:** Lessons 3 (Octaves) and 4 (Intervals) were built as an explicit, bounded exception to the original "no Lessons 3–8 before a real user test" gate. Lessons 5–8 remain blocked.

**Reason:** After reviewing the simulated user test (`47-first-user-test-results.md`), the product owner's assessment was that five minutes of onboarding isn't enough exposure to the teaching method to justify a $19/month decision — the fix isn't pricing, it's giving the free/early experience more room to prove the method before asking someone to commit. Two more lessons extend that proof; eight would be guessing at scale before any real human has responded to even the first two. The boundary was deliberately kept at "2 more, then stop and test again," not moved to "build the rest of the module."

**Date:** July 2026

## Decision 003

**Decision:** Lessons 5–8 (The Major Scale, Building Any Major Chord, Major vs Minor, Every Chord You Need) were built as an **explicit founder override** of Decision 002's gate, after the product owner personally ran the product end-to-end and judged Lessons 1–4 "extremely elementary," wanting the module to build real comfort with every major/minor chord, scale construction, and the notes that make up a chord.

**Reason:** This was flagged as a real tension before proceeding — the founder's own reaction is not the real external test the gate was built to require, and the target persona (`02-customer-persona.md`'s "Stuck Adult Musician," explicitly *not* someone with existing musical background) may not share the founder's sense of what counts as "elementary." A founder or engineer with prior music exposure is, structurally, the closest thing to the "avoid: professional musicians, developers familiar with the project" instruction in the original Phase 9 test brief — the same instruction that shaped who should and shouldn't be trusted to judge Module 1's difficulty. The override was made anyway, as an explicit, informed product-owner decision, not a default. It changes what got *built*; it does not change what still needs *validating* — see the Validation Gate above.

**Date:** July 2026
