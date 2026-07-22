/**
 * Types for Module 1 (Piano Foundations). See docs/39-lesson-engine.md.
 *
 * A Lesson is a sequence of one or more steps. Every step follows the same
 * four zones: Concept -> Visual -> Interaction -> Discovery. Today, every
 * Module 1 lesson has exactly one step; the shape supports lessons with
 * several steps without a rewrite once later modules need that.
 *
 * Step *copy and metadata* are data-driven (this file + lessons.ts). A
 * step's Visual/Interaction zone is a bespoke component, registered
 * separately in src/components/lesson/interactions — it isn't modeled here
 * because it's behavior, not content.
 */

export interface LessonCopy {
  heading: string;
  body: string;
}

export interface LessonStepConfig {
  /** Unique across the whole module; used to look up its interaction component. */
  id: string;
  concept: LessonCopy;
  /** The "aha" moment, revealed once the step's interaction is complete. */
  discovery: LessonCopy;
}

export interface Lesson {
  id: string;
  /** 1-based position within the module. */
  index: number;
  title: string;
  steps: LessonStepConfig[];
}

export interface LessonProgressState {
  completedLessonIds: string[];
}
