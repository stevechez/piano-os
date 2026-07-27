"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LessonStep } from "./LessonStep";
import { LESSON_INTERACTIONS } from "./interactions";
import { useLessonProgress } from "@/features/curriculum/progress";
import { saveLessonProgress } from "@/features/curriculum/actions";
import type { Lesson } from "@/features/curriculum/types";

export interface LessonPlayerProps {
  lesson: Lesson;
  /** Scopes progress tracking — the onboarding id, or a curriculum module id. */
  moduleId: string;
  /** Route prefix this lesson's siblings live under, e.g. "/learn/lessons" or "/learn/module-1". */
  basePath: string;
  totalLessons: number;
  /** Undefined when this is the last lesson in the module. */
  nextLessonId?: string;
  /** Where Continue goes after this lesson's last step, if it's the module's last lesson. */
  finalHref: string;
  /** Continue button label on the module's last lesson's last step. */
  finalLabel: string;
}

/**
 * Sequences a lesson's steps and, once the last step is done, hands off to
 * the next lesson (or finalHref). One engine for onboarding and every
 * curriculum module — see docs/44-learning-curriculum-architecture.md.
 */
export function LessonPlayer({
  lesson,
  moduleId,
  basePath,
  totalLessons,
  nextLessonId,
  finalHref,
  finalLabel,
}: LessonPlayerProps) {
  const router = useRouter();
  const { markComplete } = useLessonProgress(moduleId);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = lesson.steps[stepIndex];
  const isLastStepInLesson = stepIndex === lesson.steps.length - 1;
  const isLastLesson = !nextLessonId;

  const Interaction = LESSON_INTERACTIONS[step.id];

  function handleInteractionComplete() {
    setCompleted(true);

    // Progress is tracked per-lesson (not per-step) — a lesson counts as
    // done once its final step is. Intermediate steps just advance.
    if (isLastStepInLesson) {
      markComplete(lesson.id);
      void saveLessonProgress(moduleId, lesson.id);
    }
  }

  function handleContinue() {
    if (!isLastStepInLesson) {
      setStepIndex((i) => i + 1);
      setCompleted(false);
      return;
    }

    router.push(nextLessonId ? `${basePath}/${nextLessonId}` : finalHref);
  }

  const continueLabel = !isLastStepInLesson
    ? "Continue"
    : isLastLesson
      ? finalLabel
      : "Continue";

  // How much weight this completion deserves: a plain step just advances,
  // finishing a lesson's last step is a small milestone, and finishing the
  // last lesson currently available is the moment worth the most polish —
  // see docs/44-learning-curriculum-architecture.md.
  const moment: "step" | "lesson" | "final" = !isLastStepInLesson
    ? "step"
    : isLastLesson
      ? "final"
      : "lesson";

  return (
    <LessonStep
      lesson={lesson}
      step={step}
      totalLessons={totalLessons}
      stepNumber={stepIndex + 1}
      totalStepsInLesson={lesson.steps.length}
      completed={completed}
      moment={moment}
      continueLabel={continueLabel}
      onContinue={handleContinue}
    >
      {Interaction && <Interaction onComplete={handleInteractionComplete} />}
    </LessonStep>
  );
}
