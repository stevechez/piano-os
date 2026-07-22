"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LessonShell } from "./LessonShell";
import { LESSON_INTERACTIONS } from "./interactions";
import { useLessonProgress } from "@/features/curriculum/progress";
import { saveLessonProgress } from "@/features/curriculum/actions";
import { MODULE_ID } from "@/features/curriculum/lessons";
import type { Lesson } from "@/features/curriculum/types";

export interface LessonExperienceProps {
  lesson: Lesson;
  totalLessons: number;
  /** Undefined when this is the last lesson in the module. */
  nextLessonId?: string;
}

export function LessonExperience({
  lesson,
  totalLessons,
  nextLessonId,
}: LessonExperienceProps) {
  const router = useRouter();
  const { markComplete } = useLessonProgress();
  const [completed, setCompleted] = useState(false);

  const Interaction = LESSON_INTERACTIONS[lesson.id];

  function handleInteractionComplete() {
    setCompleted(true);
    markComplete(lesson.id);
    // Best-effort sync for signed-in users; localStorage already has it.
    void saveLessonProgress(MODULE_ID, lesson.id);
  }

  function handleContinue() {
    router.push(nextLessonId ? `/learn/lessons/${nextLessonId}` : "/learn/complete");
  }

  return (
    <LessonShell
      lesson={lesson}
      totalLessons={totalLessons}
      completed={completed}
      isLastLesson={!nextLessonId}
      onContinue={handleContinue}
    >
      {Interaction && <Interaction onComplete={handleInteractionComplete} />}
    </LessonShell>
  );
}
