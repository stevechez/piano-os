# PianoOS — First User Test Results

**Document:** 47-first-user-test-results.md
**Version:** 1.0
**Status:** Simulated Dry Run — Not A Substitute For Real Testing
**Created:** July 2026

---

# What This Document Is — Read This First

**This is a simulation, not a real user test.** No actual humans were recruited or observed. This document exists because the product owner asked for a simulated walkthrough while the real external test (`45-first-user-test-script.md`) is still pending recruitment.

What's real in this document:

- Every screen, screenshot, copy string, and interaction mechanic described was captured by actually driving the live PianoOS build in a browser this session — landing page through onboarding, purchase, and Module 1 Lessons 1–2.
- Where an actual product bug or content inconsistency was found by reading the code or observing the running app, it's reported as a real finding, not a guess.

What's simulated:

- The "participants" are personas from `32-beta-testing-and-validation-plan.md`, not real people.
- Their reactions, hesitations, and quotes are informed predictions based on those personas' documented profiles and the actual screens/copy observed — not things anyone actually said. Every quote in this document is marked as simulated.

**This does not clear the validation gate in `46-curriculum-authoring-guide.md`.** It does not count as the "first external user test is completed" checkbox. Its purpose is narrower: pressure-test the test script itself, and surface obvious, fixable friction before spending a real stranger's first impression on it. Run `45-first-user-test-script.md` with real people before treating Module 1 as validated.

---

# Simulated Participants

Drawn from the four personas already defined in `32-beta-testing-and-validation-plan.md` — three used here, one held back for the real test:

| Persona | Profile |
|---|---|
| **Margaret, 58** | The Stuck Keyboard Owner. Bought a keyboard two years ago, tried an app for a few weeks, stopped. |
| **David, 47** | The Former Student. Took lessons as a kid through age 12, remembers almost nothing, wants to play again. |
| **Priya, 34** | The Guitar Player. Plays guitar, understands chords and progressions by name, has never touched piano seriously. |

---

# Session Walkthroughs

## Landing Page (10-Second Test)

**Actual screen observed** (above the fold, no scrolling): eyebrow "A new way to learn piano," headline "Learn piano like a musician," subhead "Stop memorizing notes. Start understanding the chords, patterns, and harmony behind the songs you love," a "Start Learning Free" button, and a card listing Patterns → Chords → Songs → Creativity.

Can a visitor answer the three questions within 10 seconds, from this screen alone?

- **What is PianoOS?** Yes — "a new way to learn piano," reinforced by "stop memorizing notes."
- **Why is it different?** Yes — the same line does double duty.
- **Who is it for?** **No.** Nothing above the fold names an audience. The actual answer — "PianoOS was built for people like you" with the four persona cards (keyboard owner, former student, guitarist, singer-songwriter) — exists, but it's the fourth section down the page, well past a 10-second glance.

**Margaret (predicted):** Reads the headline, nods at "stop memorizing notes" — that's her exact frustration with the app she abandoned. Doesn't see herself named anywhere, but the tone (calm, not childish) doesn't repel her either. *(simulated)* "Okay, this doesn't look like the last one I tried."

**David (predicted):** Same read, faster — he skims. Clicks "Start Learning Free" without ever seeing the audience section at all. For him this isn't a problem; he was already sold on "chords not notes" before he'd have scrolled further.

**Priya (predicted):** Notices "harmony" and "patterns" in the subhead — words she associates with guitar, not piano. That's the hook for her specifically, and it's the *only* line on the page that would resonate with a guitarist. *(simulated)* "Patterns... okay, that's a word I actually use."

**Finding:** The 10-second test passes 2 of 3 questions reliably. "Who is it for?" only resolves for someone who scrolls — for the persona spread this product actually targets, that's a real gap, not a nice-to-have.

---

## Onboarding (5 Free Lessons)

Real timings from this session's walkthrough (automated clicking — a real human reading the concept/discovery text each time would run longer, but the *relative* pacing between lessons is the useful signal):

| Lesson | What it asks | Observed mechanic |
|---|---|---|
| 1. Welcome to PianoOS | Find C, E, G | Click 3 keys |
| 2. Piano Is a Pattern Machine | Find every C | Click 4 keys |
| 3. Your First Chord | Play C, E, G again, then "Hear it as one chord" | Click 3 keys + 1 button |
| 4. Chords Create Songs | Click 4 chords in order | Click 4 chips |
| 5. Play Your First Song | — | Click 1 button ("Play the song") and watch |

**Where the three would smile:** All three, predicted, at the Lesson 2 discovery — "Every C on the keyboard is the same idea, repeated." This is the moment the onboarding is built around, and mechanically it holds up: the student genuinely has to find four Cs across the keyboard themselves before the explanation appears, so the "aha" isn't handed to them.

**Where hesitation is plausible:** Lesson 4's chord-progression grid (four chips labeled 1–4, only the current one clickable) requires noticing that chips 2–4 are visually greyed and disabled until their turn. **David (predicted)**, moving fast, might click chip 2 before chip 1 and get no response — not a real dead end (the interaction just ignores the click), but a half-second "did that work?" moment with no error state to explain why nothing happened.

**Where the real finding is:** Lesson 5. The concept text says "let's play it," and the Discovery panel afterward reads *"Not a video. Not a demo — you played it."* But the actual interaction is one click on "Play the song," which auto-plays the full progression and highlights keys on its own — the student does not press a single key themselves for this lesson, unlike every lesson before it.

**Priya (predicted), who plays an instrument and would notice this precisely:** *(simulated)* "Wait — I didn't play that. It played itself." This is the kind of adult who has strummed a real guitar and knows the difference between "I did this" and "I watched this." For a product whose entire differentiator is discovery-before-explanation and student-does-it-not-watches-it, this is the one lesson that breaks its own rule, and it breaks it at the emotionally loudest claim in onboarding ("you played it").

---

## Purchase Moment

**Actual screen observed:** `/learn/complete` — recap of three things learned, a "Remember this?" C Major chord visualizer, plan selector (Monthly $19 / Annual $149, annual pre-selected with "Save 35%"), "Unlock PianoOS" button, reassurance line "Cancel anytime. Secure checkout powered by Stripe."

Asked, per the script, "What do you think happens next?" before any explanation:

**Margaret (predicted):** *(simulated)* "I guess I put my card in and then it's like... a normal app? Hopefully it doesn't make me set a password too, that's always the annoying part." (It doesn't — but she has no way to know that yet, and this is a real, reasonable anxiety for exactly her persona.)

**David (predicted):** *(simulated)* "Probably a bunch of onboarding forms. Isn't that how these always go." Sets an expectation of friction the product is specifically designed to avoid — makes the actual (passwordless, one-click) experience land as a pleasant surprise rather than a fulfilled expectation.

**Priya (predicted):** Notices the annual badge and the recap card immediately — reads recap before touching the price toggle. *(simulated)* "Oh, it's already showing me what I get for the yearly one. Fine, cheaper is cheaper."

**Finding:** No one predicts what actually happens (instant account creation, no password, no form). That's not a flaw — it's the entire point of `43-commerce-and-checkout.md` Decision 001 — but it does mean the product is one step ahead of user expectation here, which is the right direction to be surprising in.

---

## First Paid Lesson

**Actual screen observed:** landing back at `/learn?welcome=1` shows "You're in." / "Welcome to PianoOS." with a Module 1 card reading "Your first lesson is ready when you are" and a single "Begin Module 1 →" button — no separate signup screen, no dashboard tour.

**All three (predicted), asked "does this feel like a new product or a continuation?":** Converges on continuation. The visual language (same dark theme, same gold accent, same card shape as the onboarding overview) doesn't reset. **Margaret specifically** — the persona most likely to abandon something that "feels like starting over" — is the one this matters most for. *(simulated)* "Good, it didn't send me to some whole new dashboard thing."

**Module 1 Lesson 1** ("Keyboard Patterns") teaches black-key groupings of two and three, building directly on onboarding's "every C is the same pattern" insight, then Lesson 2 ("Finding Notes") applies that landmark to find every F. Both hold together as a real *next* idea, not a repeat of what onboarding already taught — **David (predicted)**, the one most likely to feel patronized by review content, doesn't get that reaction. *(simulated)* "Okay — that's new information, not just 'here's the same chord again.'"

**Finding:** The continuation goal from Phase 8 (docs 44/`/learn` rework) reads as achieved for all three predicted personas. No friction found here.

---

# Emotional Moments Log (Simulated)

Predicted reactions written down as they'd occur, per the script's instruction to capture these verbatim rather than paraphrased after the fact:

- *(Margaret, at Lesson 2 discovery)* "Oh — that's all it is?"
- *(David, at Lesson 4, clicking the wrong chip)* "...did that do anything?"
- *(Priya, at Lesson 5)* "Wait, I didn't play that."
- *(All three, landing page)* — none identify an intended audience within 10 seconds.
- *(Margaret, at /learn post-purchase)* "Good, it didn't send me to some whole new dashboard thing."
- *(David, at Module 1 Lesson 1)* "Okay — that's new information, not just 'here's the same chord again.'"

---

# Confusion, Delight, Friction, Quotes

## Confusion

1. "Who is it for?" isn't answerable from the landing page's first viewport — all three personas.
2. Lesson 4's disabled-until-your-turn chord chips give no feedback when the wrong one is clicked (David).
3. Lesson 5's Discovery copy claims the student played the song; the mechanic has them click one button and watch. This is confusion about *what just happened*, the most damaging kind at the highest-stakes moment in onboarding (Priya, and plausibly anyone who's played an instrument before).

## Delight

1. Lesson 2's "every C is the same" reveal — the interaction genuinely requires self-discovery before the explanation lands (all three).
2. Post-purchase continuity — no dashboard reset, no re-onboarding (Margaret especially).
3. Module 1 Lesson 1/2 feel like real new content, not a repeat of onboarding (David especially).
4. The marketing subhead's specific words ("patterns," "harmony") resonate immediately with an adjacent-instrument player (Priya) — a hook the current copy doesn't seem to be deliberately aiming at guitarists, but does anyway.

## Friction

1. Landing page audience-fit requires scrolling past three sections.
2. Marketing page's "Never wonder what to practice next" section (further down the page) promises adaptive practice guidance — "PianoOS remembers where you are and quietly guides your next step" — that doesn't exist in the product yet. Not tested against a persona directly in this simulation, but flagged here because it's a real gap between marketing promise and current build a real tester could notice if they explore before purchasing.
3. No error/feedback state on a disabled chord chip click (Lesson 4).

## Quotes (Simulated — Not Verbatim From Real Participants)

> "Okay, this doesn't look like the last one I tried." — Margaret, landing page

> "Oh — that's all it is?" — Margaret, Lesson 2

> "Wait, I didn't play that. It played itself." — Priya, Lesson 5

> "Good, it didn't send me to some whole new dashboard thing." — Margaret, post-purchase

> "Okay — that's new information, not just 'here's the same chord again.'" — David, Module 1 Lesson 1

---

# Decision Gate

## Must Fix Before More Curriculum

1. **Lesson 5's "you played it" claim doesn't match its mechanic.** Either make the interaction require the student to actually trigger each chord (closer to Lesson 4's mechanic), or change the Discovery copy so it doesn't claim an active action that didn't happen. This sits at the single most important emotional beat in the entire free experience — it should not be the one place the product's core promise and its actual behavior disagree.

## Improve Soon

1. Add a visible "not yet" affordance (e.g. a disabled-cursor or a brief shake) when a Lesson 4 chord chip is clicked out of order, so a fast-moving user gets feedback instead of silence.
2. Consider whether the landing page's audience answer ("built for people like you") needs to move higher, or whether the Hero needs one line naming the audience directly, so the 10-second test passes on all three questions instead of two.

## Nice To Have

1. Reconcile the marketing page's "quietly guides your next step" / adaptive-practice language with what Phase 5+ (AI Coach) actually builds, once that phase exists — either soften the current copy now or treat it as a north star the copy is allowed to describe early.
2. The guitarist-specific resonance of "patterns/harmony" language (Priya) is a real but currently-accidental hook — worth knowing about if a future guitarist-targeted marketing variant is ever considered, not urgent now.

---

# Explicit Rule

No new lessons — Module 1 Lessons 3–8 or otherwise — until:

✓ A **real** external user test (not this simulation) is completed per `45-first-user-test-script.md`

✓ Its findings are reviewed alongside this document's predictions, to see which held up and which didn't

The next milestone remains validation, not curriculum expansion.

---

# Future Phase

Per the brief this document was written against: once real feedback exists, the next phase is **Phase 10 — Refine Module 1**, not Module 2. Refine means pacing, wording, interactions, transitions, and confidence — starting with the Must Fix item above, which a real test would very plausibly surface independently. Module 2 begins only once Module 1 feels exceptional, not merely complete.

---

# Decision Log

## Decision 001

**Decision:** This document simulates a user test using personas and a live walkthrough of the actual product, rather than waiting for real recruitment to produce any written findings.

**Reason:** Requested directly, to pressure-test the test script and surface fixable friction cheaply before spending a real stranger's first impression on it. Explicitly does not satisfy the validation gate's "first external user test" requirement — see the disclaimer at the top of this document.

**Date:** July 2026
