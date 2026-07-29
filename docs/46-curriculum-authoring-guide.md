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

**Module 2: Playing Real Music** (paid — `src/features/curriculum/modules.ts`):

1. Smooth Chord Changes (2 steps)
2. Rhythm Creates Music (1 step)
3. The Most Common Song Pattern (1 step)
4. Playing With Both Hands (1 step)
5. Dynamics (1 step)
6. Your First Complete Song (1 step)
7. Playing Without Looking (1 step)
8. Celebration (1 step)

Built in parallel with real user testing, under explicit product direction — see Decision 004 below. Onboarding, pricing, and the paywall were not touched.

**Module 3: Expressing Yourself** (paid — `src/features/curriculum/modules.ts`):

1. Chord Inversions (1 step)
2. Adding a Simple Fill (1 step)
3. Creating Your Own Introduction (1 step)
4. Choosing Your Own Rhythm (1 step)
5. Ear Training: Major or Minor? (1 step)
6. Playing By Ear (1 step)
7. Arranging It Your Way (1 step)
8. Your Musical Voice (1 step)

Built immediately following Module 2, on direct instruction to proceed without a pre-build confirmation checkpoint — see Decision 005 below. No Phase handoff document existed for this one; the theme was derived from this document's own Long-Term Vision and CLAUDE.md's "Creativity Is A Core Skill" principle. Onboarding, pricing, and the paywall remain untouched.

**Module 4: Beyond Major and Minor** (paid — `src/features/curriculum/modules.ts`):

1. Seventh Chords (2 steps)
2. Suspended Chords (2 steps)
3. Where Chords Come From (1 step)
4. The ii-V-I (1 step)
5. Sevenths Have Shapes Too (1 step)
6. The vi Chord, Explained (1 step)
7. A Richer Arrangement (1 step)
8. Your New Harmonic Vocabulary (1 step)

Built immediately following Module 3, continuing the same "proceed without a checkpoint" instruction — see Decision 006 below. No Phase handoff document existed for this one either; the theme (7th chords, suspended chords, diatonic harmony) comes from `11-roadmap.md`'s "Chord Language" phase, the part of it Module 1 hadn't covered yet. Notably, every lesson reuses an existing interaction primitive — the first module needing zero new interaction types. Onboarding, pricing, and the paywall remain untouched.

**Module 5: Accompanying a Song** (paid — `src/features/curriculum/modules.ts`):

1. Broken Chords (1 step)
2. The Alternating Bass (1 step)
3. Verse and Chorus (1 step)
4. Harmonizing a Melody (1 step)
5. The Oom-Pah Pattern (1 step)
6. Filling the Space (1 step)
7. A Full Arrangement (1 step)
8. You Can Accompany Anyone (1 step)

Built immediately following Module 4, continuing the same "proceed without a checkpoint" instruction — see Decision 007 below. No Phase handoff document existed for this one either; the theme (broken chords, alternating bass, verse/chorus contrast, harmonizing a melody, the oom-pah pattern, filling space, full arrangement) comes from `11-roadmap.md`'s Song Learning Engine and Accompaniment territory. Deliberately excludes anything requiring live audio input (e.g. following a real singer's tempo) since the product has no MIDI/audio-analysis capability yet. Like Module 4, every lesson reuses an existing interaction primitive (`ChoiceInteraction`, `NoteSequenceInteraction`, or `PlayProgressionInteraction`) — the second consecutive module needing zero new interaction types. Onboarding, pricing, and the paywall remain untouched.

**Module 6: Improvising Your Own Ideas** (paid — `src/features/curriculum/modules.ts`):

1. Call and Response (1 step)
2. The Safety Net Scale (1 step)
3. Question and Answer (1 step)
4. Rhythmic Variation (1 step)
5. Adding an Ornament (1 step)
6. Improvising Over a Progression (1 step)
7. Two Ideas Back to Back (1 step)
8. You Are Already Improvising (1 step)

Built immediately following Module 5, continuing the same "proceed without a checkpoint" instruction — see Decision 008 below. No Phase handoff document existed for this one either; the theme comes from `11-roadmap.md`'s Phase 8 "Musical Creativity" (improvisation, harmonic variation), the part of that phase Module 3 hadn't covered. Introduces `FreePlayInteraction` — the first genuinely new interaction primitive since Module 3's `ChoiceInteraction` — for open-ended play within a "safety net" note set, reused across 4 of the 8 lessons; the remaining lessons reuse `NoteSequenceInteraction` and `ChoiceInteraction`. Onboarding, pricing, and the paywall remain untouched.

**Module 7: Writing Your Own Song** (paid — `src/features/curriculum/modules.ts`):

1. Choosing Your Chords (1 step)
2. Your Verse (1 step)
3. Your Chorus (1 step)
4. Adding a Melody (1 step)
5. A Simple Ending (1 step)
6. Verse Into Chorus (1 step)
7. Naming Your Sound (1 step)
8. You Wrote a Song (1 step)

Built immediately following Module 6, on the same "proceed without a checkpoint" instruction — see Decision 009 below. No Phase handoff document existed for this one either; the theme (songwriting basics) comes from `11-roadmap.md`'s Phase 8 "Musical Creativity," the last piece of that phase not yet covered by Modules 3 and 6. A capstone: the student assembles their own verse-into-chorus song from chords they already know, adds an improvised melody, and chooses an ending and an arrangement style — every choice is theirs, culminating in a real play-through of the whole piece. Requires three new progressions in `src/lib/music/chords.ts` (`myVerse`, `myChorus`, `mySong`), deliberately with no `songReference` since the point is that this one belongs to the student. Zero new interaction primitives — the third module (after 4 and 5) needing none, reusing `ChoiceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` only. Onboarding, pricing, and the paywall remain untouched.

**Module 8: Borrowed Chords** (paid — `src/features/curriculum/modules.ts`):

1. The Chord From Next Door (1 step)
2. Hearing the Difference (1 step)
3. The Chord From Even Further Away (1 step)
4. Building a Borrowed Chord (1 step)
5. Borrowing in a Real Progression (1 step)
6. Reharmonizing Your Song's Ending (1 step)
7. When to Borrow (1 step)
8. You Can Hear Outside the Key Now (1 step)

Built immediately following Module 7, on the same "proceed without a checkpoint" instruction — see Decision 010 below. No Phase handoff document existed for this one either; the theme (modal mixture / reharmonization, kept beginner-appropriate) comes from `11-roadmap.md`'s Phase 9 "Advanced Musicianship" — the first curriculum drawn from that phase, rather than Phase 8. Introduces `fMinor` and `bFlatMajor` chords borrowed from C major's parallel minor, plus `borrowedTurn` and `borrowedCapstone` progressions in `src/lib/music/chords.ts`. Lesson 6 deliberately reharmonizes the ending of the student's own song from Module 7 rather than an unrelated example. Zero new interaction primitives — the fourth module (after 4, 5, and 7) needing none, reusing `ChoiceInteraction`, `NoteSequenceInteraction`, and `PlayProgressionInteraction` only. Onboarding, pricing, and the paywall remain untouched.

**Module 9: A New Color: Playing in Mixolydian** (paid — `src/features/curriculum/modules.ts`):

1. One Note Changes Everything (1 step)
2. Building the Mixolydian Scale (1 step)
3. The Mixolydian Vamp (1 step)
4. A New Safety Net (1 step)
5. Same Chords, Different Mood (1 step)
6. Grooving in Mixolydian (1 step)
7. Ending on the Root (1 step)
8. You Can Hear in More Than One Color Now (1 step)

Built immediately following Module 8, on the same "proceed without a checkpoint" instruction — see Decision 011 below. No Phase handoff document existed for this one either; the theme (modal playing, kept to a single mode) comes from `11-roadmap.md`'s Phase 9 "Advanced Musicianship," continuing Module 8's exploration of that phase. Introduces the Mixolydian mode as one flattened 7th away from a major scale the student already knows, reusing Module 8's `bFlatMajor` chord (Mixolydian's defining color chord is the same ♭VII already built) and adding only one new progression, `mixolydianVamp`, from chords that already existed — no new chords needed. Reuses Module 6's `FreePlayInteraction` "safety net" framing with a new note set. Zero new interaction primitives — the fifth module (after 4, 5, 7, and 8) needing none, reusing `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively. Onboarding, pricing, and the paywall remain untouched.

**Module 10: Putting It All Together** (paid — `src/features/curriculum/modules.ts`):

1. A Third Section: The Bridge (1 step)
2. Bridge Into Final Chorus (1 step)
3. A Color for the Bridge (1 step)
4. Your Solo Section (1 step)
5. Verse Into Your Bridge (1 step)
6. Landing Somewhere Unexpected (1 step)
7. Performing with Intention (1 step)
8. Your Complete Performance (1 step)

Built immediately following Module 9, on the same "proceed without a checkpoint" instruction — see Decision 012 below. Unlike Modules 8 and 9, this one is a deliberate course-correction rather than more new theory: the Validation Gate had directly flagged Modules 8 and 9 as the curriculum's deepest departure yet from its "adult beginner" persona, so Module 10 teaches exactly one new structural idea (a bridge — the vi-IV-I-V shape) and otherwise synthesizes skills the student already has (Module 7's song, Module 6's improvisation, Module 8's borrowed chords, Module 2's dynamics) into one complete, performable piece. Drawn from `11-roadmap.md`'s Phase 9 "Composition" and "Performance" rather than continuing into "Advanced harmony" or "Modal playing." Needs zero new chords and zero new interaction primitives — the sixth module (after 4, 5, 7, 8, and 9) needing none, reusing `ChoiceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively. Three new progressions (`myBridge`, `myVerseIntoBridge`, `myCompletePiece`) are all built from chords already in `chords.ts`. Onboarding, pricing, and the paywall remain untouched.

**Module 11: Training Your Ear** (paid — `src/features/curriculum/modules.ts`):

1. Which Interval Is It? (1 step)
2. Wider Intervals (1 step)
3. Triad or Suspended? (1 step)
4. Borrowed or Diatonic? (1 step)
5. Major Scale or Mixolydian? (1 step)
6. Steady or Syncopated? (1 step)
7. Your Own Chord, By Ear (1 step)
8. You Can Hear It Now (1 step)

Built immediately following Module 10, on the same "proceed without a checkpoint" instruction — see Decision 013 below. A second consecutive pullback, in the same spirit as Module 10: rather than more new harmonic vocabulary, every lesson tests recognition-by-ear of content from an earlier module (Module 1's intervals, Module 4's suspended chords, Module 8's borrowed chords, Module 9's Mixolydian mode, Module 6's rhythm, Module 7's own song). Introduces `EarTrainingInteraction`, a new primitive generalizing the "listen, guess from fixed options, wrong answers retry" shape Module 3's bespoke `MajorOrMinorEarInteraction` already used once — reused across all 8 lessons in this module, the most concentrated reuse of a single new primitive across an entire module so far. `MajorOrMinorEarInteraction` itself is deliberately left untouched rather than refactored onto the new primitive, since it already works and wasn't asked to change. Onboarding, pricing, and the paywall remain untouched.

**Module 12: Playing In Any Key** (paid — `src/features/curriculum/modules.ts`):

1. The Same Shape, A New Starting Point (1 step)
2. Building In G Major (1 step)
3. Your Progression, Moved (1 step)
4. Which Key Fits Your Voice? (1 step)
5. Same Pattern, New Key? (1 step)
6. A Borrowed Chord, Transposed (1 step)
7. Your Song, In A New Key (1 step)
8. You Can Play Anywhere Now (1 step)

Built immediately following Module 11, on the same "proceed without a checkpoint" instruction — see Decision 014 below. A genuinely new theme (transposition) rather than a third consecutive pullback, but framed as proof of portability rather than new vocabulary: the student's Module 7 song is moved from C major into G major, and every chord involved (`gMajor`, `eMinor`, `cMajor`, `dMajor`, `cMinor`) already existed in `chords.ts` — only three new progressions (`myVerseInG`, `myChorusInG`, `myFullSongInG`) were needed. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `FreePlayInteraction` exclusively — the eighth module (after 4, 5, 7, 8, 9, 10, and 11) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 13: Playing in a Minor Key** (paid — `src/features/curriculum/modules.ts`):

1. The Same Four Chords, A New Home (1 step)
2. A Minor's Own Progression (1 step)
3. The Minor iv Chord (1 step)
4. Building the Natural v (1 step)
5. The Stronger Pull (1 step)
6. Your Solo, In A Minor Key (1 step)
7. Choosing Your Home, Deliberately (1 step)
8. You Have Two Homes Now (1 step)

Built immediately following Module 12, on the same "proceed without a checkpoint" instruction — see Decision 015 below. Reframes chords the student has used since onboarding (Am, F, C, G) around A minor as tonic rather than a visitor inside C major — a new listening perspective, not new vocabulary. Needed exactly one new chord (`eMajor`, the harmonic-minor raised leading tone) and two new progressions (`myMinorHomeProgression`, `myMinorCadence`), both built mostly from chords already in `chords.ts`. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively — the ninth module (after 4, 5, 7, 8, 9, 10, 11, and 12) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 14: Writing a Minor Key Song** (paid — `src/features/curriculum/modules.ts`):

1. Choosing Your Minor Chords (1 step)
2. Your Minor Verse (1 step)
3. Your Minor Chorus (1 step)
4. A Melody In Minor (1 step)
5. A Minor Ending (1 step)
6. Verse Into Minor Chorus (1 step)
7. Naming Your Minor Sound (1 step)
8. You Wrote a Second Song (1 step)

Built immediately following Module 13, on the same "proceed without a checkpoint" instruction — see Decision 016 below. A synthesis module tying Module 7's songwriting capstone together with Module 13's minor-key reframing: structurally identical to Module 7 (choose chords, verse, chorus, melody, ending, arrangement, capstone) but genuinely different in mood, centered on A minor. Needs zero new chords — `aMinor`, `fMajor`, `dMinor`, and `eMajor` all already existed — only three new progressions (`myMinorVerse`, `myMinorChorus`, `myMinorSong`), deliberately a different chord order than Module 13's cadence so this song has its own identity. Reuses `ChoiceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively — the tenth module (after 4, 5, 7, 8, 9, 10, 11, 12, and 13) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 15: Reading a Chord Chart** (paid — `src/features/curriculum/modules.ts`):

1. What a Chart Looks Like (1 step)
2. Repeated Chords (1 step)
3. Reading Sevenths and Suspensions (1 step)
4. Sight-Reading a New Chart (1 step)
5. A Chart In A New Key (1 step)
6. Reading Your Own Song's Chart (1 step)
7. A Minor Chart (1 step)
8. You Can Read Anything Now (1 step)

Built immediately following Module 14, on the same "proceed without a checkpoint" instruction — see Decision 017 below. Deliberately not staff notation — CLAUDE.md states plainly that PianoOS is "not a traditional sheet music education platform" and to "teach patterns before notation." A chord chart (just chord names, in order) is the notation real musicians actually use for exactly this kind of playing, and it's a written form of a pattern the student already holds rather than a competing system. Introduces `ChordChartInteraction`, a new primitive: unlike `PlayProgressionInteraction`, the keyboard gives no highlighted-key hint — recalling each chord's notes from its written name alone is the entire point. Every chart reuses chords already in `chords.ts`, including one (Lesson 4) combining chords in an order never previously used together, a genuine first sight-read. Zero new chords needed. Onboarding, pricing, and the paywall remain untouched.

**Module 16: Spreading Your Sound** (paid — `src/features/curriculum/modules.ts`):

1. A Chord, Bunched Together (1 step)
2. Building a Spread Voicing (1 step)
3. Spreading a Minor Chord (1 step)
4. Ending On a Spread Chord (1 step)
5. Spreading Your Own Song's Chorus (1 step)
6. Spread Voicing, By Ear (1 step)
7. Playing a Spread Chord Yourself (1 step)
8. You Can Fill the Room Now (1 step)

Built immediately following Module 15, on the same "proceed without a checkpoint" instruction — see Decision 018 below. A genuinely new technique kept deliberately simple: open/spread voicings, moving exactly one note of a known chord an octave to give it more room — distinct from Module 3's inversions (which changes which note is lowest, not how much space the chord occupies). Needs three new chord entries (`cMajorSpread`, `fMajorSpread`, `gMajorSpread`, each an existing triad with one note displaced an octave, kept within `PlayProgressionInteraction`'s fixed C3-C5 range) and one new progression (`spreadCadence`). Reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `EarTrainingInteraction`, and `PlayProgressionInteraction` exclusively — the tenth module (after 4, 5, 7, 8, 9, 10, 12, 13, and 14) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 17: Keeping Steady Time** (paid — `src/features/curriculum/modules.ts`):

1. A Steadier Beat (1 step)
2. A Faster Beat (1 step)
3. Counting Yourself In (1 step)
4. Steady or Rushed? (1 step)
5. Practicing Slow On Purpose (1 step)
6. Your Tempo, Your Choice (1 step)
7. Keeping Time Through Your Own Song (1 step)
8. You Can Keep Time Now (1 step)

Built immediately following Module 16, on the same "proceed without a checkpoint" instruction — see Decision 019 below. A rhythm-focused module returning to ground Module 2 first touched. Introduces `TempoTapInteraction`, generalizing the exact mechanic Module 2's bespoke `RhythmTapInteraction` already used once (a metronome with tolerance-windowed tap detection, no penalty for a miss) into a reusable primitive with configurable tempo and tap count — reused across 5 of the 8 lessons here. `RhythmTapInteraction` itself is deliberately left untouched rather than refactored onto the new primitive, consistent with how `MajorOrMinorEarInteraction` was left alone when `EarTrainingInteraction` was extracted in Module 11. The remaining lessons reuse `EarTrainingInteraction` and `ChoiceInteraction`. Zero new chords. Onboarding, pricing, and the paywall remain untouched.

**Module 18: Introduction to the Blues** (paid — `src/features/curriculum/modules.ts`):

1. The Blues' Three Chords (1 step)
2. Building a Dominant Seventh (1 step)
3. The First Four Bars (1 step)
4. The Turnaround (1 step)
5. Hearing the Blues Shuffle (1 step)
6. Soloing Over the Blues (1 step)
7. The Full Form (1 step)
8. You Can Play the Blues Now (1 step)

Built immediately following Module 17, on the same "proceed without a checkpoint" instruction — see Decision 020 below. A fresh angle: not a new chord type or key relationship, but a real, widely-recognized musical form — the 12-bar blues — built from dominant seventh versions of chords the student already knows. Needs two new chords (`c7`, `f7` — the blues' I7 and IV7, completing the I7-IV7-V7 set alongside Module 4's `g7`) and three new progressions (`bluesOpening`, `bluesMiddle`, `twelveBarBlues`). The capstone plays the real, complete 12-bar form (with its actual repeated bars) rather than a compressed stand-in. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `FreePlayInteraction` exclusively — the eleventh module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, and 16) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 19: Waltz Time: Playing in 3** (paid — `src/features/curriculum/modules.ts`):

1. Counting to Three (1 step)
2. A Waltz Bass Pattern (1 step)
3. Your Own Song, In Waltz Time (1 step)
4. A Full Waltz Measure (1 step)
5. 3/4 or 4/4? (1 step)
6. Waltzing Through a Minor Key (1 step)
7. Building a Longer Waltz Pattern (1 step)
8. You Can Play in Three Now (1 step)

Built immediately following Module 18, on the same "proceed without a checkpoint" instruction — see Decision 021 below. A genuinely new concept — meter — since everything so far implicitly counted in groups of four; this module introduces 3/4 time and the classic "oom-pah-pah" waltz bass pattern. Adds an additive, backward-compatible `beatsPerMeasure` prop to Module 17's `TempoTapInteraction` (defaults to 4, so every Module 17 lesson that doesn't pass it is unaffected) rather than a new primitive. Needs zero new chords or progressions, reusing chords already in `chords.ts` plus direct callbacks to the student's own Module 7 and Module 14 songs. Reuses `TempoTapInteraction`, `NoteSequenceInteraction`, `ChoiceInteraction`, and `EarTrainingInteraction` exclusively. Onboarding, pricing, and the paywall remain untouched.

**Module 20: The Complete Chart Reader** (paid — `src/features/curriculum/modules.ts`):

1. Reading the Blues (1 step)
2. Reading Spread Voicings (1 step)
3. Reading the ii-V-I (1 step)
4. Reading a Borrowed Turn (1 step)
5. Reading the Mixolydian Vamp (1 step)
6. Reading Your Second Song (1 step)
7. Reading a Minor Cadence (1 step)
8. You Can Read Anything, Still (1 step)

Built immediately following Module 19, on the same "proceed without a checkpoint" instruction — see Decision 022 below. A 20th-module milestone that introduces nothing new: it extends Module 15's chart-reading skill across everything learned since (Modules 16-19, plus a few earlier progressions never actually read from a chart before) — the blues, spread voicings, the ii-V-I, a borrowed-chord turn, the Mixolydian vamp, and the student's own Module 14 song, ending on a chart mixing several of these together. Needs zero new chords or progressions; every chart is a hardcoded chord-id array using chords already in `chords.ts`. Reuses `ChordChartInteraction` exclusively, across all 8 lessons — the twelfth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, and 18) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 21: The Circle of Fifths** (paid — `src/features/curriculum/modules.ts`):

1. One Step Away (1 step)
2. Building the First Few Steps (1 step)
3. Two Steps Away (1 step)
4. Getting Further Away (1 step)
5. Your Borrowed Chords, On the Circle (1 step)
6. Finding Your Way Home (1 step)
7. Charting the Circle (1 step)
8. You Can See the Map Now (1 step)

Built immediately following Module 20, on the same "proceed without a checkpoint" instruction — see Decision 023 below. A genuinely understanding-focused module, squarely in CLAUDE.md's "teach understanding before memorization" mandate: it gives the student the unifying conceptual map behind things already experienced piecemeal — why transposing to G (Module 12) felt natural, why the ii-V-I (Module 4) resolves so satisfyingly (a walk back toward home along the circle), and why borrowed chords (Module 8) work (a short trip to a neighboring spot). Needs zero new chords or progressions — reuses chords already in `chords.ts` (including a comparison, Lesson 5, pairing G Major and F Minor, never directly compared before) plus the existing `twoFiveOne` and `classicPop` progressions. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, and `ChordChartInteraction` exclusively — the thirteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, and 20) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 22: The Circle's Minor Side** (paid — `src/features/curriculum/modules.ts`):

1. Every Major Key Has a Minor Twin (1 step)
2. G Major's Minor Twin (1 step)
3. D Major's Minor Twin (1 step)
4. Building B Minor (1 step)
5. Walking the Inner Ring (1 step)
6. Major Home or Minor Home? (1 step)
7. Reading the Inner Ring (1 step)
8. You Know the Whole Circle Now (1 step)

Built immediately following Module 21, on the same "proceed without a checkpoint" instruction — see Decision 024 below. The natural part 2 of Module 21: every major key on the circle has a relative minor twin at the same position (an inner ring), demonstrated across three pairings — C/Am (Module 13), G/Em, and a new one, D/Bm. Needs exactly one new chord (`bMinor`, D major's relative minor) and zero new progressions, reusing Module 13's `myMinorHomeProgression` and `myMinorCadence` directly. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `ChordChartInteraction` exclusively — the fourteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, 20, and 21) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

**Module 23: The Missing Seventh Chord** (paid — `src/features/curriculum/modules.ts`):

1. The Seventh Chord You Haven't Built (1 step)
2. Why It Sounds Unstable (1 step)
3. Hiding Inside G7 (1 step)
4. The Diminished Cadence (1 step)
5. Diminished or Not (1 step)
6. A Substitute for V (1 step)
7. Reading a Diminished Chord (1 step)
8. You Know All Seven Chords Now (1 step)

Built immediately following Module 22, on the same "proceed without a checkpoint" instruction — see Decision 025 below. Module 4's "Where Chords Come From" built chords on five of C major's seven scale degrees (I, ii, IV, V, vi); this module builds one of the two still missing — vii°, the diminished triad on B (B-D-F), the only diatonic triad quality distinct from major and minor (two stacked minor thirds, no perfect fifth). Ties back to Module 4's ii-V-I (vii° shares three of four notes with V7 and can substitute for it) and to Module 13's raised leading tone. Needs one new chord (`bDiminished`) and three new progressions (`leadingToneCadence`, `viiForFive`, and capstone `sevenChordClose`) — the diminished quality itself is genuinely new, so a new chord was unavoidable, but reuses `NoteSequenceInteraction`, `ChoiceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `ChordChartInteraction` exclusively — the fifteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, 20, 21, and 22) needing zero new interaction primitives. Onboarding, pricing, and the paywall remain untouched.

## PLANNED (not built — do not treat as existing)

Module 24 and beyond are not yet named or scoped.

---

# 4. Validation Gate

Status, updated as each item clears:

✓ Stripe Price IDs are fixed

✓ Purchase flow works end-to-end

✓ A **simulated** first user test was run (`47-first-user-test-results.md`) — surfaced real findings (a landing-page gap, a Lesson 5 content/mechanic contradiction) that were acted on directly, and Lessons 3–4 were built as a deliberate, explicit exception to extend the "aha" experience before real testing, per product direction.

⚠ Lessons 5–8 were built via an **explicit founder override** of this gate (Decision 003) — not because a real external test happened. Module 1's *existence* is complete; whether this specific theory content (scale construction, chord formulas, major/minor) actually lands for a real beginner is still unverified.

⚠ Module 2 was also built ahead of real testing, via a second explicit override (Decision 004) — this time to run in parallel with testing being organized, not to replace it. Onboarding, pricing, and the paywall were explicitly excluded from this override and remain untouched.

⚠ Module 3 was built via a third explicit override (Decision 005), immediately after Module 2, with no pre-build confirmation checkpoint. Same exclusions apply: onboarding, pricing, and the paywall untouched.

⚠ Module 4 was built via a fourth explicit override (Decision 006), continuing directly from Module 3 on the same "proceed without a checkpoint" instruction. Same exclusions apply.

⚠ Module 5 was built via a fifth explicit override (Decision 007), continuing directly from Module 4 on the same "proceed without a checkpoint" instruction. Same exclusions apply.

⚠ Module 6 was built via a sixth explicit override (Decision 008) — this time after the risk was raised directly with the product owner first (per this document's own note that a sixth module should be a point to push back, not just override again) and the product owner chose to proceed anyway. Same exclusions apply.

⚠ Module 7 was built via a seventh explicit override (Decision 009) — the risk was raised directly again before starting, consistent with Decision 008's note, and the product owner again chose to proceed. Same exclusions apply.

⚠ Module 8 was built via an eighth explicit override (Decision 010) — the risk was raised directly again before starting, consistent with the standing expectation, and the product owner again chose to proceed. Same exclusions apply.

⚠ Module 9 was built via a ninth explicit override (Decision 011) — the risk was raised directly again before starting, including a direct note that Module 8 had already moved into content further from "adult beginner" territory, and the product owner again chose to proceed. Same exclusions apply.

⚠ Module 10 was built via a tenth explicit override (Decision 012) — the risk was raised directly again before starting, and the product owner again chose to proceed. Unlike Modules 8 and 9, Module 10 itself is a deliberate pullback from advancing theory further — a synthesis/performance capstone rather than new territory — chosen specifically in response to this gate's own concern about Modules 8-9 drifting from the beginner persona. Same exclusions apply regardless.

⚠ Module 11 was built via an eleventh explicit override (Decision 013) — the risk was raised directly again before starting, and the product owner again chose to proceed. Module 11 continues Module 10's pullback: a second consecutive practical-skill module (ear training) rather than new theory. Same exclusions apply regardless.

⚠ Module 12 was built via a twelfth explicit override (Decision 014) — the risk was raised directly again before starting, and the product owner again chose to proceed. Module 12 introduces a genuinely new theme (transposition) but frames it as portability of existing understanding rather than new vocabulary. Same exclusions apply regardless.

⚠ Module 13 was built via a thirteenth explicit override (Decision 015) — the risk was raised directly again before starting, and the product owner again chose to proceed. Module 13 reframes chords already taught (Am, F, C, G) around a minor tonic rather than introducing new vocabulary. Same exclusions apply regardless.

⚠ Module 14 was built via a fourteenth explicit override (Decision 016) — the risk was raised directly again before starting, and the product owner again chose to proceed. Module 14 is a synthesis of Modules 7 and 13 rather than new theory. Same exclusions apply regardless.

⚠ Module 15 was built via a fifteenth explicit override (Decision 017) — the risk was raised directly again before starting, and the product owner again chose to proceed. Module 15 introduces chord-chart reading, deliberately distinct from staff notation, per CLAUDE.md's "not a traditional sheet music education platform." Same exclusions apply regardless.

⚠ Module 16 was built via a sixteenth explicit override (Decision 018) — the risk was raised directly again before starting, and the product owner again chose to proceed. This override came after the user briefly requested "Module 26," clarified to mean the next sequential module. Same exclusions apply regardless.

⚠ Module 17 was built via a seventeenth explicit override (Decision 019) — the risk was raised directly again before starting, and the product owner again chose to proceed. Same exclusions apply regardless.

⚠ Module 18 was built via an eighteenth explicit override (Decision 020) — the risk was raised directly again before starting, and the product owner again chose to proceed. Same exclusions apply regardless.

⚠ Module 19 was built via a nineteenth explicit override (Decision 021) — the risk was raised directly again before starting, and the product owner again chose to proceed. Same exclusions apply regardless.

⚠ Module 20 was built via a twentieth explicit override (Decision 022) — the risk was raised directly again before starting, and the product owner again chose to proceed. Same exclusions apply regardless.

⚠ Module 21 was built via a twenty-first explicit override (Decision 023) — the risk was raised directly again before starting, referencing the 20-module milestone reflection explicitly, and the product owner again chose to proceed. Same exclusions apply regardless.

⚠ Module 22 was built via a twenty-second explicit override (Decision 024) — the risk was raised directly again before starting, and the product owner again chose to proceed. Same exclusions apply regardless.

⚠ Module 23 was built via a twenty-third explicit override (Decision 025) — the risk was raised directly again before starting, and the product owner again chose to proceed. Same exclusions apply regardless.

> ## STOP.
>
> **Do not start Module 24, and do not treat Modules 1–23 as validated content, until:**
>
> ✓ A **real** external user test is completed (`45-first-user-test-script.md` — the simulation in `47` does not satisfy this)
>
> ✓ Its feedback is reviewed — specifically watching whether Lessons 5–8's theory density (scales, chord formulas) lands for a genuine beginner, whether Module 2's reinterpreted mechanics (rhythm tapping, A/B dynamics, landmark recall without hints) actually teach what they intend to, whether Module 3's premise (creative choice, no wrong answer) makes sense to someone who's still building basic confidence, whether Module 4's harmonic content (7ths, suspensions, diatonic theory) is introduced too early relative to how much a beginner has actually absorbed, whether Module 5's accompaniment concepts (broken chords, alternating bass, harmonizing a melody) make sense once a beginner has only ever played chords in isolation, whether Module 6's open-ended improvisation (no "correct" note or idea) feels liberating or disorienting to someone who has only ever had a single right answer up to this point, whether Module 7's songwriting capstone actually feels like an achievement or like busywork stitched from prior lessons, whether Module 8's borrowed-chord content (modal mixture) is simply too advanced for a persona defined as "adult beginners," whether Module 9's introduction of a full mode (Mixolydian) compounds that same risk further, whether Module 10's synthesis capstone actually feels like a satisfying culmination or like ten modules is already more curriculum than a genuine beginner has earned the right to skip past validating, whether Module 11's ear-training content actually lands as a practical skill or as an additional 8 lessons stacked onto an already-long, unvalidated sequence, whether Module 12's transposition content is a genuine "aha" or one abstraction too many stacked on top of eleven prior modules, whether Module 13's minor-key reframing genuinely clarifies or adds a layer of ambiguity ("which chord is home?") a beginner didn't ask for, whether Module 14's second song feels like a genuine creative milestone or like a template rerun with different chords, whether Module 15's chart-reading actually feels like real-world utility or like an academic exercise dropped in among the creative modules, whether Module 16's spread-voicing content is a genuinely useful technique or a nuance a beginner doesn't yet have the ear for, whether Module 17's tap-timing mechanic actually measures something meaningful for a mouse-driven beginner or introduces frustration from click-latency variance that has nothing to do with real musical timing, whether Module 18's blues content lands as an exciting, motivating "real music" milestone or as one more style dropped into an already-long sequence with no feedback on any of it, whether Module 19's meter content is a genuine "aha" or an abstraction too far given nineteen modules have now shipped with zero real feedback, whether Module 20's chart-reading review actually consolidates prior learning or reads as busywork revisiting old material without new payoff, whether Module 21's circle-of-fifths framing genuinely clarifies the prior twenty modules or is one more abstract layer on top of an already-long unvalidated sequence, whether Module 22's second circle-of-fifths module compounds that same "one abstract layer too many" risk further rather than resolving it, whether Module 23's diminished-chord content is a genuinely useful piece of harmonic vocabulary or a music-theory tangent that doesn't obviously serve a beginner's actual playing, and whether any module overshoots the persona the same way the founder's own "elementary" reaction may have undershot Lessons 1–4
>
> ✓ Per the Phase 11 handoff: if testing surfaces philosophy-level changes, apply them starting with the most recent module, and backport into earlier modules where appropriate
>
> **The next milestone is still validation.** Building curriculum answered "can PianoOS teach this content at all" — it did not answer "does this land for a real beginner," which remains open for everything built under an override. Twenty-three modules deep with no real user feedback is a real risk, not just a formality — this gate should be treated as increasingly urgent, not increasingly routine. This risk has now been surfaced and knowingly accepted eighteen times in a row (Modules 6 through 23); asking again before Module 24 remains the standing expectation, not a one-time courtesy.

If you are reading this document and considering starting Module 24, check the boxes above first.

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

## Decision 004

**Decision:** Module 2 ("Playing Real Music") was built in parallel with real user testing being organized, per explicit product direction (the Phase 11 handoff) — rather than waiting for Module 1's real-test feedback first. Onboarding, pricing, and the paywall were explicitly kept off-limits for this work; only new curriculum was added.

**Reason:** New curriculum expansion and changes to the already-shipped funnel (onboarding/pricing/paywall) carry different risk — the former adds to what a subscriber gets, the latter changes what a prospect experiences before paying. Gating the first on real-world evidence while still requiring it for the second was the product owner's explicit call, not an inconsistency: it's evidence-gating the decisions where being wrong is expensive (turning away prospects) while allowing forward progress on the decisions where being wrong is cheap (a lesson that needs later revision).

Four content/interaction decisions in Module 2 required real interpretive judgment, not just reuse, and are recorded here so a future reader knows they were deliberate:

- **Lesson 2 (Rhythm)** needed a genuinely new mechanic — no timing/metronome system existed. Built as a simple visual+audible beat with tap-along tolerance, not full rhythmic notation.
- **Lesson 3 (Most Common Song Pattern)** could not reuse onboarding's C-G-Am-F progression without repeating already-taught content, so it introduces a second, equally common progression (I-IV-V, "Twist and Shout") instead — giving Module 2 its own musical identity.
- **Lesson 5 (Dynamics)** cannot capture real touch velocity from a mouse click. Built as an honest A/B comparison (the same chord at two explicit gain levels) rather than fabricating expressive capture — deliberately avoiding the exact "claims you played it expressively, but the mechanic didn't require it" mistake already caught and fixed once in onboarding (see `47-first-user-test-results.md`).
- **Lesson 7 (Playing Without Looking)** cannot be literal in a web UI — a student is always looking at the screen. Reinterpreted as landmark recall: the same "find every F" task from Module 1, with the highlight and labels turned off, genuinely testing whether the landmark was internalized rather than followed visually.

**Date:** July 2026

## Decision 005

**Decision:** Module 3 ("Expressing Yourself") was built immediately following Module 2, on direct instruction to proceed without a pre-build confirmation checkpoint. No Phase handoff document existed for it — the theme and lesson sequence were derived from `46`'s own "Long-Term Vision" ("Module 3: I can begin expressing myself through music") and CLAUDE.md's "Creativity Is A Core Skill" principle, which names the exact territory: chord inversions, fills, introductions, rhythm choices.

**Reason:** This is the third consecutive explicit override of the validation gate (after Decisions 003 and 004), now extended to cover Module 3 as well as Module 2. The pattern established in those two decisions holds here too: onboarding, pricing, and the paywall remain untouched; only new curriculum was added; and the gate itself was not deleted, only moved forward — see the updated Validation Gate below, which now covers Module 4.

Module 3's lessons deliberately favor a genuinely new mechanic — "try each of several musical options, then discover there's no wrong choice" (`ChoiceInteraction`) — over quiz-style right/wrong interactions, since the module's whole premise (creative choice) has no single correct answer. The one lesson that does have a correct answer, ear training (major vs. minor by listening), is framed as a gentle retry, not a graded test, consistent with "no dark patterns" and "confidence should feel earned."

**Date:** July 2026

## Decision 006

**Decision:** Module 4 ("Beyond Major and Minor") was built immediately following Module 3, continuing the same "proceed without a checkpoint" instruction. No Phase handoff document existed for it — the theme (7th chords, suspended chords, diatonic harmony) was derived from `11-roadmap.md`'s "Chord Language" phase, specifically the parts of it Module 1 didn't cover (Module 1 only reached major/minor triads and inversions).

**Reason:** This is the fourth consecutive override, and it's recorded here with a direct flag rather than routine phrasing: four modules now exist with zero real user feedback on any of them. That's a materially different risk profile than the first override was. Nothing about this decision changes the validation gate's requirement — it remains exactly as urgent as Decision 003 first stated it, just deferred four times now instead of once.

Unlike Modules 2 and 3, Module 4 required no new interaction primitives — every lesson reuses `NoteSequenceInteraction`, `ChoiceInteraction`, or `PlayProgressionInteraction`, all already built. This is worth noting as a genuine (if incidental) validation of the interaction vocabulary's reusability, separate from the unvalidated question of whether the content itself is right for the persona.

**Date:** July 2026

## Decision 007

**Decision:** Module 5 ("Accompanying a Song") was built immediately following Module 4, continuing the same "proceed without a checkpoint" instruction. No Phase handoff document existed for it — the theme (broken chords, alternating bass, verse/chorus contrast, harmonizing a melody, the oom-pah pattern, filling space between phrases, full arrangement) was derived from `11-roadmap.md`'s Song Learning Engine and Accompaniment territory. It deliberately does not simulate following a real singer's tempo or live audio input, since the product has no MIDI or audio-analysis capability yet (explicitly future work per CLAUDE.md) — every mechanic instead uses scheduled/sequenced audio to represent a real accompaniment technique honestly.

**Reason:** This is the fifth consecutive override, and the risk framing from Decision 006 is repeated rather than softened: five modules now exist with zero real user feedback on any of them. The validation gate's urgency has not changed and should not be read as routine just because it keeps being deferred — see the strengthened Validation Gate note below.

Like Module 4, Module 5 required no new interaction primitives — every lesson reuses `ChoiceInteraction`, `NoteSequenceInteraction`, or `PlayProgressionInteraction`. This is the second consecutive module validating the maturity of the existing interaction vocabulary, independent of whether the content itself is right for the persona.

**Date:** July 2026

## Decision 008

**Decision:** Module 6 ("Improvising Your Own Ideas") was built immediately following Module 5. No Phase handoff document existed for it — the theme was derived from `11-roadmap.md`'s Phase 8 "Musical Creativity" (improvisation, harmonic variation), the part of that phase Module 3 ("Expressing Yourself") hadn't covered. Unlike every prior override, this one was not a unilateral continuation: the validation gate's own note that a sixth module should be a point to push back, not override again, was surfaced directly to the product owner before starting, and the product owner explicitly chose to proceed with the override rather than pause for real testing.

**Reason:** This is the sixth consecutive override. The framing is the same as Decisions 006 and 007 — six modules now exist with zero real user feedback on any of them, and that risk has not been reduced by asking first, only made a deliberate and informed choice rather than a routine one. The validation gate's requirement is unchanged.

Module 6 introduces `FreePlayInteraction`, the first genuinely new interaction primitive since Module 3's `ChoiceInteraction` — open-ended play within a "safety net" set of notes over a looping backing chord, with no fixed order and no discrete pre-defined options. It is reused across 4 of the module's 8 lessons (Safety Net Scale, Question and Answer, Improvising Over a Progression, You Are Already Improvising); the remaining lessons reuse `NoteSequenceInteraction` and `ChoiceInteraction`. This module's core premise — there is no "wrong" improvised idea — mirrors Module 3's "no wrong choice" framing, now applied to genuinely open-ended play rather than a small set of options.

**Date:** July 2026

## Decision 009

**Decision:** Module 7 ("Writing Your Own Song") was built immediately following Module 6. No Phase handoff document existed for it — the theme (songwriting basics) was derived from `11-roadmap.md`'s Phase 8 "Musical Creativity," the last piece of that phase not yet covered after Modules 3 and 6. Consistent with Decision 008's note that the next module shouldn't assume the override would be granted again without asking, the risk was surfaced directly to the product owner a second time before starting, and the product owner again chose to proceed.

**Reason:** This is the seventh consecutive override. Two overrides in a row have now been made with the risk explicitly named and knowingly accepted rather than silently continued — that's a meaningfully different posture than Decisions 003–007, even though the underlying risk (unvalidated content compounding) is unchanged. The validation gate's requirement stands exactly as it did at Decision 003.

Module 7 is a deliberate capstone rather than new theoretical territory: it asks the student to assemble their own verse-into-chorus song from chords, an accompaniment style, and an improvised melody they already have from Modules 1, 5, and 6, then choose their own ending and arrangement. It required zero new interaction primitives — the third module (after 4 and 5) to need none, reusing `ChoiceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively. It did require three new progressions in `chords.ts` (`myVerse`, `myChorus`, `mySong`), deliberately without a `songReference`, since the point of this module is that the song belongs to the student rather than citing an existing one.

**Date:** July 2026

## Decision 010

**Decision:** Module 8 ("Borrowed Chords") was built immediately following Module 7. No Phase handoff document existed for it — the theme (modal mixture / reharmonization, kept beginner-appropriate) was derived from `11-roadmap.md`'s Phase 9 "Advanced Musicianship," the first curriculum drawn from that phase rather than Phase 8. Consistent with the standing expectation from Decision 008, the risk was surfaced directly to the product owner a third time before starting, and the product owner again chose to proceed.

**Reason:** This is the eighth consecutive override. Three overrides in a row have now been made with the risk explicitly named and knowingly accepted — the pattern from Decisions 008 and 009 continues rather than lapsing back into silent continuation. The validation gate's requirement stands exactly as it did at Decision 003. One thing is genuinely new here, though, and is called out directly in the updated Validation Gate note: Module 8 is the first module to draw from Phase 9 "Advanced Musicianship" rather than Phases 2–4 or 8, meaning its content sits further from the "adult beginner" persona than anything built so far. That raises the cost of staying unvalidated, and the gate note reflects that explicitly rather than treating this override as routine.

Module 8 borrows F Minor and B♭ Major — chords from C major's parallel minor — as a controlled, limited introduction to reharmonization, deliberately distinct from Module 4's vi-chord substitution (a diatonic chord) and Module 6's melody harmonization (choosing between two diatonic chords under a fixed note). Lesson 6 reharmonizes the ending of the student's own song from Module 7 rather than an unrelated example, continuing the callback pattern Module 7 itself established. It required zero new interaction primitives — the fourth module (after 4, 5, and 7) to need none, reusing `ChoiceInteraction`, `NoteSequenceInteraction`, and `PlayProgressionInteraction` exclusively.

**Date:** July 2026

## Decision 011

**Decision:** Module 9 ("A New Color: Playing in Mixolydian") was built immediately following Module 8. No Phase handoff document existed for it — the theme (modal playing, kept to a single mode) was derived from `11-roadmap.md`'s Phase 9 "Advanced Musicianship," continuing Module 8's exploration of that phase rather than moving to a new one. Consistent with the standing expectation, the risk was surfaced directly to the product owner a fourth time before starting — this time with an explicit note that Module 8 had already moved into content further from "adult beginner" territory than anything prior — and the product owner again chose to proceed.

**Reason:** This is the ninth consecutive override, and the fourth in a row made with the risk explicitly named rather than silently continued. The validation gate's requirement stands exactly as it did at Decision 003. Modules 8 and 9 together are now two consecutive modules drawn from Phase 9 "Advanced Musicianship" — the curriculum's deepest departure yet from its own stated persona ("adult beginners only") — and the updated Validation Gate note reflects that directly rather than treating it as routine.

Module 9 introduces the Mixolydian mode as one flattened 7th away from a major scale the student already knows, deliberately avoiding a survey of multiple modes at once. It reuses Module 8's `bFlatMajor` chord — Mixolydian's defining ♭VII color chord is the same chord already built for reharmonization — and needed only one new progression (`mixolydianVamp`), no new chords. It also reuses Module 6's `FreePlayInteraction` "safety net" framing with a new note set, reinforcing that pattern's reach into a third context. Zero new interaction primitives — the fifth module (after 4, 5, 7, and 8) to need none, reusing `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively.

**Date:** July 2026

## Decision 012

**Decision:** Module 10 ("Putting It All Together") was built immediately following Module 9. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a fifth time before starting, and the product owner again chose to proceed. Unlike every override since Decision 010, though, the module itself was designed as a deliberate pullback rather than a continuation of the same trajectory: Modules 8 and 9 had pushed into genuinely advanced territory, and the Validation Gate's own note flagged that as the curriculum's deepest departure yet from "adult beginners only." Rather than building an eleventh module further into that territory (e.g., jazz reharmonization or a second mode), Module 10 is a synthesis and performance capstone — one new structural idea (a bridge) plus a combination of skills the student already has.

**Reason:** This is the tenth consecutive override, and the fifth in a row made with the risk explicitly named rather than silently continued. The validation gate's requirement is unchanged and, per the strengthened note below, is now treated as urgent rather than routine: ten full modules exist with zero real user feedback, for a product whose entire premise depends on fitting a specific persona. The choice to make Module 10 a synthesis capstone rather than more new theory is itself a response to risk the gate had already surfaced — it doesn't reduce the validation debt, but it avoids compounding the specific "too advanced" risk Modules 8-9 raised.

Module 10 teaches exactly one new concept — a bridge, the vi-IV-I-V progression a large share of real songs use — and otherwise combines Module 7's song, Module 6's improvisation (a solo section), Module 8's borrowed chords (color for the bridge), and Module 2's dynamics (performing with intention) into one complete piece. It needed zero new chords and zero new interaction primitives — the sixth module (after 4, 5, 7, 8, and 9) to need none, reusing `ChoiceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively.

**Date:** July 2026

## Decision 013

**Decision:** Module 11 ("Training Your Ear") was built immediately following Module 10. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a sixth time before starting, and the product owner again chose to proceed. Module 11 continues Module 10's pullback rather than reverting to advancing theory: a second consecutive practical-skill module, this time ear training, rather than new harmonic vocabulary.

**Reason:** This is the eleventh consecutive override, and the sixth in a row made with the risk explicitly named rather than silently continued. The validation gate's requirement is unchanged. Eleven full modules now exist with zero real user feedback — the gate note below states directly that good judgment about *what* to build (two consecutive pullback modules) does not substitute for actually validating *whether* any of it works for a real beginner.

Module 11 introduces `EarTrainingInteraction`, generalizing the "listen, guess from fixed options, wrong answers retry" shape Module 3's bespoke `MajorOrMinorEarInteraction` already used once into a reusable primitive — past the genuine-second-repetition threshold this codebase extracts shared primitives at, and reused across all 8 of this module's lessons, the most concentrated reuse of a single new primitive across an entire module so far. `MajorOrMinorEarInteraction` was deliberately left as-is rather than refactored onto the new primitive: it already works, and refactoring already-shipped, already-verified curriculum wasn't asked for. Every lesson tests recognition-by-ear of content from an earlier module (Modules 1, 4, 6, 7, 8, and 9) rather than introducing new theory, directly continuing Module 10's response to the Validation Gate's "too advanced" concern.

**Date:** July 2026

## Decision 014

**Decision:** Module 12 ("Playing In Any Key") was built immediately following Module 11. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a seventh time before starting, and the product owner again chose to proceed. Unlike Modules 10 and 11, Module 12 introduces a genuinely new theme (transposition) rather than a third consecutive pullback — but it's framed deliberately as proof that existing understanding is portable, not as new harmonic vocabulary to memorize.

**Reason:** This is the twelfth consecutive override, and the seventh in a row made with the risk explicitly named rather than silently continued. The validation gate's requirement is unchanged. Twelve full modules now exist with zero real user feedback, for a product whose entire premise depends on a persona ("adult beginners only") that has never been checked against an actual beginner.

Module 12 transposes the student's Module 7 song from C major into G major — every chord involved (`gMajor`, `eMinor`, `cMajor`, `dMajor`, `cMinor`) already existed in `chords.ts`, so only three new progressions were needed (`myVerseInG`, `myChorusInG`, `myFullSongInG`). It reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction` (Lesson 5, distinguishing a transposed pattern from a genuinely different one), and `FreePlayInteraction` (Lesson 8, improvising in the new key) — the eighth module (after 4, 5, 7, 8, 9, 10, and 11) to need zero new interaction primitives.

**Date:** July 2026

## Decision 015

**Decision:** Module 13 ("Playing in a Minor Key") was built immediately following Module 12. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner an eighth time before starting, and the product owner again chose to proceed.

**Reason:** This is the thirteenth consecutive override. The validation gate's requirement is unchanged; the strengthened note below states plainly that thirteen full modules now exist for a product whose own founding principle — "adult beginners only" — has never been checked against an actual beginner.

Module 13 reframes chords the student has used since onboarding (Am, F, C, G) around A minor as tonic rather than a visitor inside C major, a genuinely new listening perspective rather than new vocabulary. It needed exactly one new chord (`eMajor`, the harmonic-minor raised leading tone A minor borrows for a stronger cadence than its own natural, minor five chord) and two new progressions (`myMinorHomeProgression`, `myMinorCadence`), both built mostly from chords already in `chords.ts` (`aMinor`, `fMajor`, `cMajor`, `gMajor`, `dMinor`). It reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively — the ninth module (after 4, 5, 7, 8, 9, 10, 11, and 12) to need zero new interaction primitives.

**Date:** July 2026

## Decision 016

**Decision:** Module 14 ("Writing a Minor Key Song") was built immediately following Module 13. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a ninth time before starting, and the product owner again chose to proceed.

**Reason:** This is the fourteenth consecutive override. The validation gate's requirement is unchanged. Fourteen full modules now exist with zero real user feedback.

Module 14 is a synthesis rather than new theory: structurally identical to Module 7's songwriting capstone (choose chords, verse, chorus, melody, ending, arrangement, capstone) but centered on A minor instead of C major, giving the student a second original song in a genuinely different mood. It needed zero new chords — `aMinor`, `fMajor`, `dMinor`, and `eMajor` all already existed in `chords.ts` — only three new progressions (`myMinorVerse`, `myMinorChorus`, `myMinorSong`), deliberately ordered differently than Module 13's cadence so this song has its own identity rather than reusing the exact same chord sequence. It reuses `ChoiceInteraction`, `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively — the tenth module (after 4, 5, 7, 8, 9, 10, 11, 12, and 13) to need zero new interaction primitives.

**Date:** July 2026

## Decision 017

**Decision:** Module 15 ("Reading a Chord Chart") was built immediately following Module 14. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a tenth time before starting, and the product owner again chose to proceed.

**Reason:** This is the fifteenth consecutive override. The validation gate's requirement is unchanged. Fifteen full modules now exist with zero real user feedback.

Module 15 is deliberately not staff notation — CLAUDE.md is explicit that PianoOS is "not a traditional sheet music education platform" and to "teach patterns before notation." A chord chart (chord names, in order, no staff, no individual notes) is the notation real musicians actually use for exactly this kind of music, and it's a written form of a pattern the student already holds rather than a competing system introduced from scratch. It introduces `ChordChartInteraction`, a new primitive: unlike `PlayProgressionInteraction`, the keyboard gives no highlighted-key hint — recalling each chord's notes from its written name is the entire point, a genuinely new mechanic distinct from every prior interaction in the codebase. Every chart reuses chords already in `chords.ts`; Lesson 4 combines chords in an order never previously used together, giving the student a genuine first sight-read. Zero new chords needed.

**Date:** July 2026

## Decision 018

**Decision:** Module 16 ("Spreading Your Sound") was built immediately following Module 15. No Phase handoff document existed for it. The product owner briefly asked for "Module 26" — since only 15 modules existed at the time, this was clarified directly, and the product owner confirmed the intent was to continue the sequence with Module 16, not to skip ahead. Consistent with the standing expectation, the risk was surfaced directly to the product owner an eleventh time before starting, and the product owner again chose to proceed.

**Reason:** This is the sixteenth consecutive override. The validation gate's requirement is unchanged. Sixteen full modules now exist with zero real user feedback.

Module 16 introduces open/spread chord voicings, kept deliberately simple: move exactly one note of an already-known chord an octave to give it more room, distinct from Module 3's inversions (which reorders which note is lowest without changing how much space the chord occupies). It needed three new chord entries (`cMajorSpread`, `fMajorSpread`, `gMajorSpread`), each an existing triad with one note displaced an octave and deliberately kept within `PlayProgressionInteraction`'s fixed C3-C5 keyboard range, plus one new progression (`spreadCadence`). It reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `EarTrainingInteraction`, and `PlayProgressionInteraction` exclusively — the tenth module (after 4, 5, 7, 8, 9, 10, 12, 13, and 14) to need zero new interaction primitives.

**Date:** July 2026

## Decision 019

**Decision:** Module 17 ("Keeping Steady Time") was built immediately following Module 16. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a twelfth time before starting, and the product owner again chose to proceed.

**Reason:** This is the seventeenth consecutive override. The validation gate's requirement is unchanged. Seventeen full modules now exist with zero real user feedback. This module also introduces a genuine, if narrow, new risk worth naming directly: real-time tap accuracy measured from mouse clicks conflates click/input latency with actual musical timing skill, and the gate note reflects that concern explicitly rather than treating the mechanic as self-evidently sound just because it was already shipped once.

Module 17 returns to rhythm, a subject Module 2 first touched but hasn't been revisited since. It introduces `TempoTapInteraction`, generalizing the exact mechanic Module 2's bespoke `RhythmTapInteraction` already used once (a metronome with a tolerance-windowed tap detector, no penalty for a miss) into a reusable primitive with configurable BPM and tap count — reused across 5 of this module's 8 lessons, with the remaining 3 reusing `EarTrainingInteraction` and `ChoiceInteraction`. `RhythmTapInteraction` itself is deliberately left untouched, consistent with how `MajorOrMinorEarInteraction` was left alone when `EarTrainingInteraction` was extracted in Module 11. Zero new chords needed.

**Date:** July 2026

## Decision 020

**Decision:** Module 18 ("Introduction to the Blues") was built immediately following Module 17. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a thirteenth time before starting, and the product owner again chose to proceed.

**Reason:** This is the eighteenth consecutive override. The validation gate's requirement is unchanged. Eighteen full modules now exist with zero real user feedback.

Module 18 is a fresh angle rather than more chord-relationship theory: a real, widely-recognized musical form, the 12-bar blues, built from dominant seventh versions of chords the student already knows. It needed two new chords (`c7`, `f7` — the blues' I7 and IV7, completing the I7-IV7-V7 set alongside Module 4's `g7`) and three new progressions (`bluesOpening`, `bluesMiddle`, `twelveBarBlues`). The capstone plays the real, complete 12-bar form, including its actual repeated bars, rather than a compressed stand-in, since the point is that the student played the authentic structure. It reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `FreePlayInteraction` exclusively — the eleventh module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, and 16) to need zero new interaction primitives.

**Date:** July 2026

## Decision 021

**Decision:** Module 19 ("Waltz Time: Playing in 3") was built immediately following Module 18. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a fourteenth time before starting, and the product owner again chose to proceed.

**Reason:** This is the nineteenth consecutive override. The validation gate's requirement is unchanged. Nineteen full modules now exist with zero real user feedback.

Module 19 introduces a genuinely new concept, meter, since everything built so far implicitly counted in groups of four. Rather than a new primitive, it adds an additive, backward-compatible `beatsPerMeasure` prop to Module 17's `TempoTapInteraction` (defaulting to 4, so every existing Module 17 lesson that doesn't pass it keeps its exact prior behavior) — a normal evolution of an already-shared primitive, distinct from the "leave a bespoke, single-use component untouched" pattern used for `RhythmTapInteraction` and `MajorOrMinorEarInteraction`, since `TempoTapInteraction` was already the shared, generalized version. It needed zero new chords or progressions, reusing chords already in `chords.ts` and calling back directly to the student's own Module 7 and Module 14 songs. It reuses `TempoTapInteraction`, `NoteSequenceInteraction`, `ChoiceInteraction`, and `EarTrainingInteraction` exclusively.

**Date:** July 2026

## Decision 022

**Decision:** Module 20 ("The Complete Chart Reader") was built immediately following Module 19. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a fifteenth time before starting, and the product owner again chose to proceed.

**Reason:** This is the twentieth consecutive override — a round milestone the gate note now names directly as a prompt for reflection on scope, not just another routine continuation. The validation gate's requirement is unchanged. Twenty full modules now exist with zero real user feedback.

Rather than new theory, Module 20 is a deliberate review: it extends Module 15's chart-reading skill (`ChordChartInteraction`) across everything learned in Modules 16 through 19, plus a handful of earlier progressions (the ii-V-I, a borrowed-chord turn, the Mixolydian vamp) that had never actually been read from a written chart before, ending on a chart that mixes several ideas together as a genuine "read anything" review. It needed zero new chords or progressions — every chart is a hardcoded chord-id array using chords already in `chords.ts`. It reuses `ChordChartInteraction` exclusively across all 8 lessons — the twelfth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, and 18) to need zero new interaction primitives.

**Date:** July 2026

## Decision 023

**Decision:** Module 21 ("The Circle of Fifths") was built immediately following Module 20. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a sixteenth time before starting, this time explicitly referencing the 20-module milestone reflection point named in Decision 022's gate note, and the product owner again chose to proceed.

**Reason:** This is the twenty-first consecutive override. The validation gate's requirement is unchanged. Twenty-one full modules now exist with zero real user feedback. Worth recording plainly: the milestone reflection at Module 20 did not change the pattern. That's useful information in itself — this override pattern reads as a stable, considered choice by the product owner, not a default that will self-correct without a real test actually happening.

Module 21 is squarely in CLAUDE.md's "teach understanding before memorization" territory: it gives the student the unifying conceptual map (the circle of fifths) behind things already experienced piecemeal across the curriculum — why transposing to G (Module 12) felt natural, why the ii-V-I (Module 4) resolves so satisfyingly, why borrowed chords (Module 8) work. It needed zero new chords or progressions, reusing chords already in `chords.ts` plus the existing `twoFiveOne` and `classicPop` progressions. It reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, and `ChordChartInteraction` exclusively — the thirteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, and 20) to need zero new interaction primitives.

**Date:** July 2026

## Decision 024

**Decision:** Module 22 ("The Circle's Minor Side") was built immediately following Module 21. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner a seventeenth time before starting, and the product owner again chose to proceed.

**Reason:** This is the twenty-second consecutive override. The validation gate's requirement is unchanged. Twenty-two full modules now exist with zero real user feedback.

Module 22 is the natural part 2 of Module 21: every major key on the circle has a relative minor twin at the same position (an inner ring), demonstrated across three pairings — C/Am (Module 13), G/Em, and a new one, D/Bm. It needed exactly one new chord (`bMinor`, D major's relative minor) and zero new progressions, reusing Module 13's `myMinorHomeProgression` and `myMinorCadence` directly. It reuses `ChoiceInteraction`, `NoteSequenceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `ChordChartInteraction` exclusively — the fourteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, 20, and 21) to need zero new interaction primitives.

**Date:** July 2026

## Decision 025

**Decision:** Module 23 ("The Missing Seventh Chord") was built immediately following Module 22. No Phase handoff document existed for it. Consistent with the standing expectation, the risk was surfaced directly to the product owner an eighteenth time before starting, and the product owner again chose to proceed.

**Reason:** This is the twenty-third consecutive override. The validation gate's requirement is unchanged. Twenty-three full modules now exist with zero real user feedback.

Module 23 completes one of the two diatonic chords Module 4's "Where Chords Come From" left unbuilt: vii°, the diminished triad on B (B-D-F) — the only diatonic triad quality distinct from major and minor, built from two stacked minor thirds with no perfect fifth. It ties back to Module 4's ii-V-I (vii° shares three of four notes with V7 and can substitute for it) and to Module 13's raised leading tone. It needed one new chord (`bDiminished`) and three new progressions (`leadingToneCadence`, `viiForFive`, and capstone `sevenChordClose`) — the diminished quality itself is genuinely new content, so a new chord was unavoidable, but it reuses `NoteSequenceInteraction`, `ChoiceInteraction`, `PlayProgressionInteraction`, `EarTrainingInteraction`, and `ChordChartInteraction` exclusively — the fifteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, 20, 21, and 22) to need zero new interaction primitives.

**Date:** July 2026
