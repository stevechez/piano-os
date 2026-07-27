# PianoOS — First External User Test Script

**Document:** 45-first-user-test-script.md
**Version:** 1.0
**Status:** Validation
**Created:** July 2026

---

# Purpose

`32-beta-testing-and-validation-plan.md` defines the overall validation strategy — hypotheses, metrics, beta sizing. This document is the tactical piece it doesn't have yet: a literal, runnable script for sitting one real stranger down in front of the product PianoOS actually is today, and watching what happens.

This tests exactly one thing: the core loop.

```
Stranger → Landing page → Onboarding → Purchase → Module 1 Lesson 1 → Returns tomorrow
```

Not curriculum depth. Not the AI coach. Not retention over weeks. Just: does a person who has never seen PianoOS get through this loop, and does anything make them stop who wouldn't otherwise?

---

# Before You Start: One Blocker

The purchase step is currently broken — `STRIPE_PRICE_MONTHLY` / `STRIPE_PRICE_ANNUAL` hold placeholder values, not real Stripe Price IDs (see `43-commerce-and-checkout.md`). Clicking "Unlock PianoOS" will fail.

**Do not run the full script until that's fixed and Stripe checkout has been verified test-mode end to end.** Running a real stranger into a broken checkout button burns the one shot at a first impression and teaches you nothing about the product.

If you want feedback sooner, Part 1 alone (Landing → Onboarding) is safe to run today — see "Partial Test" at the end.

---

# Who To Recruit

One person for the first run. Not a friend, not a colleague who already knows the product — per `32-beta-testing-and-validation-plan.md` Risk 1, people close to you soften their feedback without meaning to.

Match `02-customer-persona.md`: an adult (35–65) who owns a keyboard or piano, has tried learning before, and stopped. Ask before recruiting:

- "Have you ever tried to learn piano and stopped?"
- "Do you own a keyboard or piano right now?"

Two yeses is a good fit. If they took formal lessons for years and read music fluently, they're the wrong first tester — the whole product thesis is aimed at someone traditional lessons didn't work for.

---

# How To Observe

**Moderated, in person or on a screen-share, for this first one.** Unmoderated testing is the right long-term instrument (`32-beta-testing-and-validation-plan.md` Risk 2: measure behavior, not stated opinion), but for tester #1 you want to see the exact moment someone hesitates, not just the outcome.

Rules while observing:

- Say once, at the start: *"Just do what feels natural. If something's confusing, that's useful — tell me, but don't ask me what to do next. I want to see what you'd do if I weren't here."*
- Do not help. Do not explain a screen. If they're stuck for more than ~15 seconds, write down exactly where, then let them keep struggling a bit longer before ever stepping in.
- Say nothing about what to expect. Don't preview "you're about to learn a chord." Let the product do that.
- Write down their exact words when they react to something — "wait, that's it?" or "oh, I get it" are gold. Paraphrasing loses the signal.

---

# Day 1 Script

## Part 1 — Landing Page

Hand them a device with the marketing homepage open. Say: *"Pretend a friend sent you this link. Do whatever you'd normally do."*

Watch for:
- Do they read, or scroll past copy looking for a button?
- Which CTA do they click — is it obvious there's exactly one path in?
- Any hesitation before clicking "Start Learning"?

## Part 2 — Onboarding (5 free lessons)

Watch for, per lesson:
- Do they understand the *concept* text before touching the keyboard, or do they skip straight to clicking keys?
- Does the keyboard interaction feel obvious, or do they need to hunt for what's clickable?
- At the Discovery reveal — do they read it, or click Continue immediately? (If everyone skips it, the payoff isn't landing.)
- Do they say anything unprompted at "you just played your first chord" or "you just played your first song"? This is the moment the whole product is betting on.

Timing: this should take 3–5 minutes per `42-mvp-user-flow.md`'s own success criteria. Note the actual clock time.

## Part 3 — /learn/complete → Purchase

Watch for:
- Do they read the recap, or skip to the plan selector?
- Monthly vs. annual — which do they reach for, and do they hesitate on price?
- Any visible confusion during the "Setting up your account…" pause after payment?
- Reaction to landing back in the app signed in with no password step — do they even notice, or does it feel invisible (which is the goal)?

## Part 4 — Module 1, Lesson 1

Watch for:
- Does "Welcome to PianoOS" / "Begin Module 1" read as continuous with what they just did, or does it feel like a new, different product?
- Same interaction/comprehension questions as Part 2, now for the paid content (black-key groupings, landmark-finding).
- At the end of Lesson 1 ("Lesson complete") — do they keep going into Lesson 2 on their own, or stop and wait to be told?

## End Part 1 Debrief (same day)

Ask, don't lead:

- "What were you struggling with, before today, that made you want to try this?" *(from 32, "Before")*
- "What finally clicked, if anything?" *(from 32, "During")*
- "Did this feel different from other ways you've tried to learn?" *(from 30)*
- "Was there a moment you understood something you didn't expect to?"
- "Would you have paid for what you just did, if you weren't part of a test?" *(from 30/32 — the critical one)*

Don't ask leading versions ("wasn't that chord moment cool?"). Ask flat and let silence sit.

---

# Day 2 Script — The Return

This is the actual test of the loop's last arrow. Do not remind them the day before.

Send one message, no earlier than 24 hours later:

> "No pressure, just curious — did you think about PianoOS at all since yesterday? Feel free to hop back in if you want."

Watch for, without prompting further:
- Do they open the app on their own before you follow up, or only after?
- If they do return: do they land somewhere that makes sense, or do they seem lost about where they left off?
- Do they pick up Lesson 2 on their own?

Then ask:
- "What made you come back (or not)?"
- "Could you find where you left off, or did you have to think about it?"

If they don't return at all within ~48 hours, that's a real result — not a failed test. Record it as a warning signal per `32-beta-testing-and-validation-plan.md` ("interesting, but I don't practice").

---

# Recording Template

Fill this in live where possible — memory softens friction points fast.

```
Tester: [initials only]           Date:
Persona match: [keyboard owner / former student / guitar player / other]

LANDING → ONBOARDING
  Time to first "aha" reaction:        ___ min
  Any point they seemed lost:
  Exact words at first chord/song moment:

PURCHASE
  Monthly or annual chosen:
  Any hesitation/confusion during checkout:
  Noticed the passwordless sign-in? (y/n, reaction):

MODULE 1 LESSON 1
  Felt continuous with onboarding? (y/n, why):
  Continued into Lesson 2 unprompted? (y/n):

DAY 2 RETURN
  Returned before follow-up message? (y/n):
  Found their place without help? (y/n):
  Continued the lesson? (y/n):

VERBATIM QUOTES (most important field):

WARNING SIGNALS OBSERVED (per doc 32):

WOULD THEY PAY (their words):
```

---

# Partial Test (Safe To Run Today)

If you want signal before the Stripe fix lands, run **Part 1 and Part 2 only** (Landing → Onboarding), stop before "Unlock PianoOS," and ask just:

- "If this asked you to pay right now, would you?"
- "What would you expect to happen next?"

This validates the free experience in isolation — real signal, no broken-checkout risk.

---

# What Happens With The Results

Per `32-beta-testing-and-validation-plan.md`'s feedback loop: one tester doesn't validate or kill anything by itself. It tells you where the *next* friction point is. Fix what you find, then run tester #2. Don't wait for a large sample to act on an obvious, specific stumble (a confusing button, a copy line nobody understood) — those are cheap to fix immediately and expensive to leave in for tester #2 through #10.

---

# Decision Log

## Decision 001

**Decision:** The first tester is observed moderated (in person / screen-share), not run unmoderated.

**Reason:** `32-beta-testing-and-validation-plan.md`'s "measure behavior, not opinion" principle is right for beta scale, but the very first pass is about catching specific, fixable friction — seeing exactly where someone hesitates is worth more than a clean unmoderated log at this scale.

**Date:** July 2026
