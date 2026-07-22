"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LessonStep } from "./LessonStep";
import { LESSON_INTERACTIONS } from "./interactions";
import { useLessonProgress } from "@/features/curriculum/progress";
import { saveLessonProgress } from "@/features/curriculum/actions";
import { MODULE_ID } from "@/features/curriculum/lessons";
import type { Lesson } from "@/features/curriculum/types";

export interface LessonPlayerProps {
  lesson: Lesson;
  totalLessons: number;
  /** Undefined when this is the last lesson in the module. */
  nextLessonId?: string;
}

/**
 * Sequences a lesson's steps and, once the last step is done, hands off to
 * the next lesson (or /learn/complete). Every Module 1 lesson has exactly
 * one step today, so in practice this plays like the old single-page
 * LessonExperience — but the engine now supports lessons with several
 * steps without any changes here. See docs/39-lesson-engine.md.
 */
export function LessonPlayer({
  lesson,
  totalLessons,
  nextLessonId,
}: LessonPlayerProps) {
  const router = useRouter();
  const { markComplete } = useLessonProgress();
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
      void saveLessonProgress(MODULE_ID, lesson.id);
    }
  }

  function handleContinue() {
    if (!isLastStepInLesson) {
      setStepIndex((i) => i + 1);
      setCompleted(false);
      return;
    }

    router.push(nextLessonId ? `/learn/lessons/${nextLessonId}` : "/learn/complete");
  }

  const continueLabel = !isLastStepInLesson
    ? "Continue"
    : isLastLesson
      ? "Finish Module"
      : "Continue";

  return (
    <LessonStep
      lesson={lesson}
      step={step}
      totalLessons={totalLessons}
      stepNumber={stepIndex + 1}
      totalStepsInLesson={lesson.steps.length}
      completed={completed}
      continueLabel={continueLabel}
      onContinue={handleContinue}
    >
      {Interaction && <Interaction onComplete={handleInteractionComplete} />}
    </LessonStep>
  );
}
