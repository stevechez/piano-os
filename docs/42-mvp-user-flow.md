# PianoOS — MVP User Flow (Module 1)

**Document:** 42-mvp-user-flow.md
**Version:** 1.2 — revised: the end-of-module offer is now a real purchase (see Decision 003), not a free signup form
**Status:** Foundation
**Created:** July 2026

---

# Purpose

This document defines the concrete first-run flow for the "first magical product experience" slice: Module 1, Piano Foundations, five lessons, no account required.

This is a deliberately smaller flow than the full MVP user journey in `12-mvp-definition.md`. It exists to answer one question before the rest of that journey is built:

> "Can someone who has never used PianoOS understand the magic in the first 5 minutes?"

---

# Flow

```
Marketing homepage
      ↓
"Start Learning Free" / "Start Learning"
      ↓
/learn  (Module 1 overview — 5 lessons listed)
      ↓
/learn/lessons/welcome-to-pianoos          (Lesson 1)
      ↓ Continue
/learn/lessons/pattern-machine             (Lesson 2)
      ↓ Continue
/learn/lessons/your-first-chord            (Lesson 3)
      ↓ Continue
/learn/lessons/chords-create-songs         (Lesson 4)
      ↓ Continue
/learn/lessons/play-your-first-song        (Lesson 5)
      ↓ Complete
/learn/complete  (recap + "Unlock PianoOS")
      ↓
Stripe Checkout (monthly or annual)
      ↓ payment succeeds
Account auto-created + signed in  →  /learn  (progress synced to the account)
```

Authentication exists in the product (Supabase-backed), but there is no standalone signup form and no free tier past Module 1. The account itself is a side effect of paying, not a separate step — see `43-commerce-and-checkout.md`. Nothing is on the critical path to the first "aha" moment except playing the piano. See Decision 002 and Decision 003 below.

---

# What Changes On The Marketing Site

The Hero and Nav "Start Learning" calls to action currently point nowhere (Hero) or to a `/signup` page that doesn't exist yet (Nav). For this slice, both point directly at `/learn`. There is no signup wall between "I'm curious" and "I'm playing a chord."

---

# /learn (Module 1 overview)

A simple list of the five lessons in order, each showing:

- Lesson number and title
- One-line concept summary
- Completed state (checkmark) if already done, read from local progress

No locking for this pass — every lesson is reachable at any time. Sequencing is encouraged through order and the Continue button, not enforced through gates. See `12-mvp-definition.md` — gamification/locking mechanics are explicitly deferred.

---

# /learn/lessons/[lessonId]

Renders the four-zone lesson shell from `39-lesson-engine.md`:

1. Concept
2. Visual + Interaction (the keyboard)
3. (hidden until interaction complete) Reflection
4. Continue → next lesson, or `/learn/complete` after Lesson 5

---

# /learn/complete

The one and only purchase moment in the product. Shown once, after Lesson 5:

- A recap of the three things just learned (pattern, chord, progression)
- Plan selector (monthly / annual)
- Primary: **Unlock PianoOS** → Stripe Checkout directly — no intermediate signup form
- Reassurance: progress is already saved on this device, and continues into the account created on purchase

There is no "maybe later" path anymore: Module 1 is the entire free experience. Once it's complete, continuing requires unlocking. See `43-commerce-and-checkout.md` for the full checkout-to-account flow, including how anonymous progress is carried into the newly created account.

---

# Progress

Two layers, local-first:

1. **`localStorage`** — always written immediately on lesson completion, regardless of auth state. This is the source of truth for the current browser/device and is what makes `/learn` fully usable with zero account.

```json
{ "completedLessonIds": ["welcome-to-pianoos", "pattern-machine"] }
```

2. **Supabase `learning_progress`** — only written for signed-in users. On every `/learn` load, local and remote state are merged both directions: local-only completions get pushed up (this is how anonymous progress gets "saved" the moment someone signs up at `/learn/complete`), and remote completions get pulled down (so progress follows the account across devices/browsers once one exists).

No server round-trip is required to experience or complete Module 1.

---

# Explicit Non-Goals For This Flow

- Gating any part of Module 1 behind login (see Decision 002)
- Onboarding questionnaire
- AI coach
- Subscriptions / paywall
- Song library beyond the single song referenced in Lesson 5
- Curriculum beyond Module 1's five lessons

These remain on the roadmap (`30-mvp-build-plan.md`) but are not required to answer the five-minute question.

---

# Success Criteria

This flow succeeds if a first-time visitor can go from the marketing homepage to hearing their first chord in well under five minutes, with zero forms filled out.

---

# Decision Log

## Decision 001

**Decision:** Marketing CTAs route directly into `/learn` instead of an account creation flow, for this pass.

**Reason:** The MVP north star is measured in minutes-to-magic, not signups. Account creation can wrap around a proven experience later.

**Date:** July 2026

---

## Decision 002

**Decision:** `/learn` and all five Module 1 lessons are public. Authentication is offered exactly once, at `/learn/complete`, after the module is finished — not required to start, and not required at any point in between.

**Reason:** An intermediate build briefly gated `/learn` behind login to stand up the auth foundation. On reflection, that inverted the product thesis: PianoOS sells a transformation, not an account, and the whole point of this module is proving the transformation happens in minutes, with nothing in front of it. The natural moment to ask someone to create an account is after they've already had the "aha" moment and have something real they'd want to keep — not before. Authentication itself (Supabase, profiles, `learning_progress`) stays; only *when* it's invoked changes.

**Date:** July 2026

---

## Decision 003

**Decision:** The end-of-module offer at `/learn/complete` is a real Stripe purchase (monthly or annual), not a free account signup. There is no standalone `/signup` form and no free tier beyond Module 1. A Supabase account is created automatically as a side effect of a successful payment, and the visitor is signed in immediately without a password.

**Reason:** PianoOS is a commercial product, not a beta waitlist. Decision 002 established that the account moment should come after the "aha" moment, not before it — this decision keeps that sequencing but replaces the free account with the real product. Splitting "create an account" and "pay" into two separate steps would reintroduce exactly the kind of friction Decision 002 was written to avoid, for no benefit — there's nothing to do with a free account once Module 1 is finished. See `43-commerce-and-checkout.md` for the full mechanism.

**Date:** July 2026
