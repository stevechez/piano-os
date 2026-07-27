import type { Module } from "./types";

/**
 * The Learning Curriculum — paid content, unlocked at checkout. See
 * docs/44-learning-curriculum-architecture.md. Onboarding (onboarding.ts)
 * is deliberately separate: it isn't a Module.
 */

export const MODULE_1_ID = "module-1";

/**
 * Module 1: Piano Foundations. Lessons 1-4 exist; per
 * docs/47-first-user-test-results.md's decision gate, Lessons 5-8 wait for
 * a real external user test before being written. Lesson 1 deliberately has
 * two steps (unlike every onboarding lesson, which has one) to exercise
 * that part of the engine for real.
 *
 * Lessons 1-2 build directly on onboarding's "pattern-machine" lesson
 * (every C looks the same) by teaching the landmark musicians use to
 * navigate the keyboard: the two repeating black-key shapes. Lessons 3-4
 * build on that landmark again — octaves and intervals are both "click a
 * note, then find the related note" applications of the same
 * pattern-over-counting skill, not new unrelated theory.
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
