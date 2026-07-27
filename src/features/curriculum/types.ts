/**
 * Shared content types for both PianoOS Onboarding (onboarding.ts) and the
 * paid Learning Curriculum (modules.ts). See docs/39-lesson-engine.md and
 * docs/44-learning-curriculum-architecture.md.
 *
 * A Lesson is a sequence of one or more steps. Every step follows the same
 * four zones: Concept -> Visual -> Interaction -> Discovery. A Module is a
 * named, ordered sequence of Lessons — the paid curriculum's unit above a
 * lesson; onboarding has no Module wrapper, since it isn't part of the
 * curriculum (see docs/44-learning-curriculum-architecture.md Decision 001).
 *
 * Step *copy and metadata* are data-driven (this file + onboarding.ts /
 * modules.ts). A step's Visual/Interaction zone is a bespoke component,
 * registered separately in src/components/lesson/interactions — it isn't
 * modeled here because it's behavior, not content.
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
  /** 1-based position within its module (or within onboarding). */
  index: number;
  title: string;
  steps: LessonStepConfig[];
}

export interface Module {
  id: string;
  /** 1-based position within the Learning Curriculum. */
  index: number;
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

export interface LessonProgressState {
  completedLessonIds: string[];
}
