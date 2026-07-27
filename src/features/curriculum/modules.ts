import type { Module } from "./types";

/**
 * The Learning Curriculum — paid content, unlocked at checkout. See
 * docs/44-learning-curriculum-architecture.md. Onboarding (onboarding.ts)
 * is deliberately separate: it isn't a Module.
 */

export const MODULE_1_ID = "module-1";

/**
 * Module 1: Piano Foundations. All 8 lessons exist — Lessons 5-8 were built
 * under an explicit founder override of the validation gate; see
 * docs/46-curriculum-authoring-guide.md Decision 003. Lesson 1 deliberately
 * has two steps (unlike every onboarding lesson, which has one) to
 * exercise that part of the engine for real; Lessons 7 and 8 also use
 * multiple steps for the same reason each step needs.
 *
 * The whole module is one continuous chain of reuse, not eight unrelated
 * topics:
 * - Lessons 1-2 teach the black-key landmark for finding any note without
 *   counting.
 * - Lessons 3-4 apply that same "note relationship, not position" idea to
 *   octaves and intervals.
 * - Lesson 5 names the interval pattern that makes a major scale (which
 *   also explains *why* Lesson 1's black-key groups fall where they do).
 * - Lesson 6 shows a chord is just scale degrees 1-3-5, generalized past
 *   the one chord (C Major) taught in onboarding.
 * - Lesson 7 shows the entire major/minor distinction is one note, lowered
 *   a half step.
 * - Lesson 8 is pure application: build three chords in keys never seen
 *   before, using only the formulas from 5-7.
 */
export const MODULE_1: Module = {
  id: MODULE_1_ID,
  index: 1,
  title: "Piano Foundations",
  subtitle: "See Music Differently",
  lessons: [
    {
      id: "keyboard-patterns",
      index: 1,
      title: "Keyboard Patterns",
      steps: [
        {
          id: "keyboard-patterns-pairs",
          concept: {
            heading: "What are we learning?",
            body: "The black keys aren't scattered randomly. They cluster into two repeating shapes — a group of two, and a group of three. Let's find the groups of two first.",
          },
          discovery: {
            heading: "That's your first landmark.",
            body: "Every group of two black keys has C sitting just to its left. You don't need to count up from the bottom of the keyboard to find C — you just need to recognize this shape.",
          },
        },
        {
          id: "keyboard-patterns-triplets",
          concept: {
            heading: "Now the other shape.",
            body: "The rest of the black keys cluster in threes. Find every group of three.",
          },
          discovery: {
            heading: "Two shapes. That's the whole keyboard.",
            body: "Every black key on an 88-key piano belongs to one of these two groups. Once you can see them, you can find any note without ever counting individual keys.",
          },
        },
      ],
    },
    {
      id: "finding-notes",
      index: 2,
      title: "Finding Notes",
      steps: [
        {
          id: "finding-notes",
          concept: {
            heading: "Put the landmark to work.",
            body: "F always sits just to the left of a group of three black keys — the shape you just learned to spot. Find every F on the keyboard using that landmark, not by counting.",
          },
          discovery: {
            heading: "You found it by pattern, not by counting.",
            body: "This is the actual skill: recognizing shapes instead of memorizing 88 individual key positions. Every note has a landmark like this one.",
          },
        },
      ],
    },
    {
      id: "octaves",
      index: 3,
      title: "Octaves",
      steps: [
        {
          id: "octaves",
          concept: {
            heading: "You've seen this repeat before.",
            body: "Every C on the keyboard looks the same — you already found that. That repeat has a name: an octave. Same note, doubled in pitch. Pick any note, then find its octave.",
          },
          discovery: {
            heading: "Same note, twice.",
            body: "An octave is the most 'in tune with itself' sound in music — that's why two Cs an octave apart still sound like the same note, just higher or lower. Every note on the keyboard has one.",
          },
        },
      ],
    },
    {
      id: "intervals",
      index: 4,
      title: "Intervals",
      steps: [
        {
          id: "intervals",
          concept: {
            heading: "Not every distance sounds the same.",
            body: "Two different notes played together create a distance — an interval. You've already played one: C to G, the first jump in the progression you know. That distance is called a fifth.",
          },
          discovery: {
            heading: "Chords are built from distances like this.",
            body: "A fifth is one of the building blocks every chord you've played is made from. Once you can hear and find an interval, you're most of the way to building a chord from scratch.",
          },
        },
      ],
    },
    {
      id: "major-scale",
      index: 5,
      title: "The Major Scale",
      steps: [
        {
          id: "major-scale",
          concept: {
            heading: "One pattern, not seven notes to memorize.",
            body: "A major scale isn't seven random notes — it's one repeating pattern of steps: whole, whole, half, whole, whole, whole, half. The half-steps happen exactly where there's no black key between two white keys — the same landmark from Lesson 1. Play through the pattern starting on C.",
          },
          discovery: {
            heading: "Same pattern, any starting note.",
            body: "You just played a major scale by following a step pattern, not by memorizing 'C-D-E-F-G-A-B-C.' That exact whole-whole-half-whole-whole-whole-half pattern works starting from any note on the keyboard — that's what makes it a major scale, everywhere.",
          },
        },
      ],
    },
    {
      id: "building-major-chord",
      index: 6,
      title: "Building Any Major Chord",
      steps: [
        {
          id: "building-major-chord",
          concept: {
            heading: "You already know this chord's formula.",
            body: "C Major is the 1st, 3rd, and 5th note of the C major scale you just played. That's the whole formula: root, third, fifth. Let's build a major chord you haven't played yet — G Major — the exact same way, starting from G.",
          },
          discovery: {
            heading: "One formula. Every major chord.",
            body: "Root, then the note a major third up, then the note a fifth up from the root — that's every major chord that exists, in any key. You didn't need to be taught 'G Major' specifically. You built it.",
          },
        },
      ],
    },
    {
      id: "major-vs-minor",
      index: 7,
      title: "Major vs Minor",
      steps: [
        {
          id: "major-vs-minor-major",
          concept: {
            heading: "Build A Major first.",
            body: "Same formula as G Major, new root: root, third, fifth, starting on A.",
          },
          discovery: {
            heading: "That's A Major — bright, resolved.",
            body: "Hold that sound in your ear. One small change is about to turn it into something else entirely.",
          },
        },
        {
          id: "major-vs-minor-minor",
          concept: {
            heading: "Now lower just one note.",
            body: "Take that same A Major chord and lower only the third by a single half step. Everything else stays exactly the same. Play the result: A Minor.",
          },
          discovery: {
            heading: "That's the entire difference.",
            body: "Major and minor aren't two unrelated chord types to memorize separately — every minor chord is its major twin with the third lowered a half step. You just heard why A minor (from your first song) sounds different from A major.",
          },
        },
      ],
    },
    {
      id: "every-chord-you-need",
      index: 8,
      title: "Every Chord You Need",
      steps: [
        {
          id: "practice-d-major",
          concept: {
            heading: "Prove it to yourself.",
            body: "You now know both formulas: major is root-third-fifth from the scale; minor lowers that third a half step. Build D Major — a key you haven't touched yet.",
          },
          discovery: {
            heading: "Built, not looked up.",
            body: "Nobody showed you D Major's notes directly. You derived them from the formula.",
          },
        },
        {
          id: "practice-e-minor",
          concept: {
            heading: "Now a minor chord, new key.",
            body: "Build E Minor: root, lowered third, fifth.",
          },
          discovery: {
            heading: "Same move, different root.",
            body: "Lower the third a half step from E Major's shape, and you're already there.",
          },
        },
        {
          id: "practice-c-minor",
          concept: {
            heading: "One more, for confidence.",
            body: "Build C Minor: root, lowered third, fifth.",
          },
          discovery: {
            heading: "You can build any major or minor chord that exists.",
            body: "Two formulas, applied to any root note on the keyboard: root-third-fifth for major, and the same shape with the third lowered a half step for minor. That's every chord — not memorized one at a time, but understood once.",
          },
        },
      ],
    },
  ],
};

export const MODULES: Module[] = [MODULE_1];

export function getModule(moduleId: string): Module | undefined {
  return MODULES.find((module) => module.id === moduleId);
}

export function getModuleLesson(moduleId: string, lessonId: string) {
  return getModule(moduleId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getNextModuleLesson(moduleId: string, lessonId: string) {
  const module = getModule(moduleId);
  if (!module) return undefined;
  const current = module.lessons.find((lesson) => lesson.id === lessonId);
  if (!current) return undefined;
  return module.lessons.find((lesson) => lesson.index === current.index + 1);
}
