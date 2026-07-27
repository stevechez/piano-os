import type { Lesson } from "./types";

/**
 * The five free onboarding experiences — not a "Module." See
 * docs/44-learning-curriculum-architecture.md Decision 001: "Module" is
 * reserved for the paid Learning Curriculum (src/features/curriculum/modules.ts).
 */
export const ONBOARDING_ID = "onboarding";

/**
 * PianoOS Onboarding — the five free lessons. See
 * docs/40-interactive-learning-model.md for why these five, in this order,
 * all built around one chord family.
 *
 * Each lesson has exactly one step today. See docs/39-lesson-engine.md —
 * the steps[] shape exists so future lessons can add multiple steps
 * without changing LessonStep/LessonPlayer.
 */
export const ONBOARDING_LESSONS: Lesson[] = [
  {
    id: "welcome-to-pianoos",
    index: 1,
    title: "Welcome to PianoOS",
    steps: [
      {
        id: "welcome-to-pianoos",
        concept: {
          heading: "What are we learning?",
          body: "You're about to learn how musicians see music — not as individual keys, but as shapes and patterns.",
        },
        discovery: {
          heading: "You just played your first chord.",
          body: "That's C Major — one of the most-used chords in music. You didn't need to know its name to play it.",
        },
      },
    ],
  },
  {
    id: "pattern-machine",
    index: 2,
    title: "The Piano Is a Pattern Machine",
    steps: [
      {
        id: "pattern-machine",
        concept: {
          heading: "What are we learning?",
          body: "The keyboard isn't 88 different keys to memorize. It's the same 12-note pattern, repeating over and over.",
        },
        discovery: {
          heading: "You just proved it to yourself.",
          body: "Every C on the keyboard looks and sounds like the same idea, just higher or lower. Once you see the pattern, the whole keyboard opens up.",
        },
      },
    ],
  },
  {
    id: "your-first-chord",
    index: 3,
    title: "Your First Chord",
    steps: [
      {
        id: "your-first-chord",
        concept: {
          heading: "What are we learning?",
          body: "C, E, and G played together make a chord — three notes that create one sound, and one feeling.",
        },
        discovery: {
          heading: "That sound is everywhere.",
          body: "C Major shows up in thousands of songs you already know. You just played it on purpose, for the first time.",
        },
      },
    ],
  },
  {
    id: "chords-create-songs",
    index: 4,
    title: "Chords Create Songs",
    steps: [
      {
        id: "chords-create-songs",
        concept: {
          heading: "What are we learning?",
          body: "Songs aren't built note by note. They're built chord by chord — a small sequence, repeated and varied.",
        },
        discovery: {
          heading: "You just played a real progression.",
          body: "C → G → Am → F is one of the most-used chord progressions in popular music. You now know it by ear, not just by name.",
        },
      },
    ],
  },
  {
    id: "play-your-first-song",
    index: 5,
    title: "Play Your First Song",
    steps: [
      {
        id: "play-your-first-song",
        concept: {
          heading: "What are we learning?",
          body: "The same four chords you just learned open a real, well-known song. Let's play it.",
        },
        discovery: {
          heading: "You just played your first song.",
          body: "Not a video. Not a demo — you played it. This is what the rest of PianoOS builds on: patterns, not memorization.",
        },
      },
    ],
  },
];

export function getOnboardingLesson(lessonId: string): Lesson | undefined {
  return ONBOARDING_LESSONS.find((lesson) => lesson.id === lessonId);
}

export function getNextOnboardingLesson(lessonId: string): Lesson | undefined {
  const current = getOnboardingLesson(lessonId);
  if (!current) return undefined;
  return ONBOARDING_LESSONS.find((lesson) => lesson.index === current.index + 1);
}

export const TOTAL_ONBOARDING_LESSONS = ONBOARDING_LESSONS.length;
