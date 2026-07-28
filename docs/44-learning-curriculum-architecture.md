# PianoOS — Learning Curriculum Architecture

**Document:** 44-learning-curriculum-architecture.md
**Version:** 1.0
**Status:** Foundation
**Created:** July 2026

---

# Purpose

This document defines the architecture for PianoOS's paid Learning Curriculum — the content and access model that begins where onboarding ends. It extends `39-lesson-engine.md` (the engine that renders a lesson) and `42-mvp-user-flow.md` (the free flow that ends at checkout) with the structure needed for real, ongoing, paid content.

It also records the naming and routing decisions from the Phase 7 handoff, and one correction the handoff didn't anticipate: an identifier collision between onboarding and the real Module 1.

---

# Onboarding vs. Learning Curriculum

PianoOS has two distinct things, not one:

```
PianoOS

├── Onboarding
│     Free interactive introduction.
│     Purpose: demonstrate the PianoOS philosophy.
│     Five lessons. No account required. Not a Module.
│
└── Learning Curriculum
      Paid content, unlocked at checkout.
      ├── Module 1: Piano Foundations
      ├── Module 2: ...
      └── Module 3: ...
```

"Module" is reserved exclusively for the Learning Curriculum. The five onboarding lessons (`welcome-to-pianoos`, `pattern-machine`, `your-first-chord`, `chords-create-songs`, `play-your-first-song`) are collectively **PianoOS Onboarding** — never "Module 1."

---

# Routing

One learning ecosystem, not two products:

```
/learn
      Public onboarding. Unchanged — still free, still ungated.
        ↓
/learn/module-1/[lessonId]
      Authenticated paid curriculum. Gated by the auth middleware,
      the same mechanism that already protects /account.
```

There is no separate `/app` or `/dashboard` learning surface. The difference between onboarding and the curriculum is access level, not product identity — both render through the same engine, the same visual language, and the same `/learn` URL space.

---

# Content Hierarchy

```
Module
  |
  ├── Lesson 1
  |     |
  |     ├── Step 1
  |     └── Step 2
  |
  └── Lesson 2
        |
        └── Step 1
```

`Module` is new (this document); `Lesson` and `Step` are unchanged from `39-lesson-engine.md`. Both `onboarding.ts` and `modules.ts` share the same `Lesson`/`LessonStepConfig` types (`src/features/curriculum/types.ts`) — onboarding is simply a flat `Lesson[]` with no `Module` wrapper, since it isn't part of the curriculum.

Module 1 ("Piano Foundations") is the first real content built against this hierarchy. Its first lesson, "Keyboard Patterns," is deliberately two steps — the first curriculum content to actually exercise the multi-step shape `39-lesson-engine.md` Decision 003 introduced but never used until now.

---

# Interactions: One Reusable Pattern, Not a Generic Builder

`39-lesson-engine.md` Decision 001 chose bespoke, purpose-built interaction components over a generic template, because most interactions are meaningfully different (playing a chord vs. stepping through a progression vs. finding notes). That decision stands.

But one interaction *shape* — "find every one of these notes on the keyboard" — now recurs three times: onboarding's `pattern-machine` (find every C), Module 1's black-key-group steps (find every key in a group of two, then three), and Module 1's `finding-notes` (find every F). Recognizing a genuinely repeated pattern and extracting it is different from building a generic lesson CMS. `FindNotesInteraction` (`src/components/lesson/interactions/FindNotesInteraction.tsx`) is that one shared mechanic; `PatternMachineInteraction`, `BlackKeyPairsInteraction`, `BlackKeyTripletsInteraction`, and `FindingNotesInteraction` are thin, purpose-named wrappers around it, each still registered individually by step id in `interactions/index.ts`. Every future lesson still gets a bespoke interaction unless its mechanic is genuinely this same one.

---

# Progress Tracking

No new system. `learning_progress` (`user_id`, `module_id`, `lesson_id`, `completed`, `completed_at`) already supported an arbitrary `module_id` — it was only ever scoped to onboarding by convention, not by schema. `saveLessonProgress(moduleId, lessonId)` and the `useLessonProgress(moduleId)` hook are unchanged in shape, just parameterized correctly and reused for Module 1.

"Current lesson" and "module complete" are derived, not stored: the first lesson in a module without a completion row is the current one. No `current_lesson_id` or `current_step_index` column was added — deriving from `completed` rows is simpler and was sufficient for the vertical slice. Revisit only if a real product need for storing "in progress, step 2 of 3" arises.

---

# Decision Log

## Decision 001

**Decision:** "Module" is reserved for the paid Learning Curriculum. The five existing free lessons are "PianoOS Onboarding," not "Module 1."

**Reason:** The original build used "Module 1" for the free onboarding experience before any paid curriculum existed. Once real paid modules were being built, the same term meant two different things. Onboarding keeps its routes and behavior exactly as they were — this is a naming and documentation correction, not a product change.

**Date:** July 2026

## Decision 002

**Decision:** Paid curriculum lives at `/learn/module-1/[lessonId]`, gated by the existing auth middleware, rather than under a separate `/app` or `/dashboard` root.

**Reason:** PianoOS is one learning environment with two access tiers, not a free product and a paid product. Reusing `/learn` keeps one mental model and reuses the same `LessonPlayer`/`LessonStep` engine and `AppShell` chrome for both tiers.

**Date:** July 2026

## Decision 003

**Decision:** `src/features/curriculum/lessons.ts` was renamed to `onboarding.ts`; its `MODULE_ID` constant (value `"module-1"`) was renamed to `ONBOARDING_ID` (value `"onboarding"`), and its `LESSONS` export renamed to `ONBOARDING_LESSONS`. The real Module 1 (`src/features/curriculum/modules.ts`) now owns the `"module-1"` id.

**Reason:** This wasn't anticipated by the Phase 7 handoff, which described Decision 001 (above) as a documentation-only rename. It couldn't be: onboarding's progress code already used the literal string `"module-1"` as its Supabase `module_id` and localStorage key. Leaving it in place while giving the real Module 1 the same id would have merged their progress records. This is a mechanical identifier fix required for correctness, not a scope expansion — no route, no URL, and no user-facing behavior changed.

**Date:** July 2026

## Decision 004

**Decision:** `LessonPlayer` and `LessonList` were generalized to take `moduleId`, `basePath` (and, for `LessonPlayer`, `finalHref`/`finalLabel`) as props instead of importing onboarding's constants directly.

**Reason:** Both components were hardcoded to onboarding's module id and its `/learn/lessons` → `/learn/complete` path. Module 1 needed the same sequencing and progress-tracking behavior at a different path with a different destination. Parameterizing the four already-varying values was enough — no new abstraction layer, no config-driven lesson builder.

**Date:** July 2026

## Decision 005

**Decision:** Module 2 ("Playing Real Music") was added as `src/app/learn/module-2/` — a direct mirror of `module-1/`'s two route files, each pointing at `MODULE_2`/`MODULE_2_ID` instead. `MODULES` is now `[MODULE_1, MODULE_2]`.

**Reason:** This is the first real test of whether "Module → Lesson → Step" actually generalized past one example. It did: `LessonPlayer`, `LessonStep`, `PianoKeyboard`, and the progress system needed zero changes. The only genuine multi-module gap was `/learn`'s "Continue Learning" card, which had Module 1 hardcoded — it's now a loop over `MODULES` that surfaces whichever module the student hasn't finished yet, falling back to the last module in review mode once all are complete. See `46-curriculum-authoring-guide.md` Decision 004 for the content decisions behind Module 2 itself.

**Date:** July 2026
