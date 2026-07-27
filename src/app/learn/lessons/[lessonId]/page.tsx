import { notFound } from "next/navigation";
import {
  ONBOARDING_ID,
  ONBOARDING_LESSONS,
  TOTAL_ONBOARDING_LESSONS,
  getOnboardingLesson,
  getNextOnboardingLesson,
} from "@/features/curriculum/onboarding";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return ONBOARDING_LESSONS.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getOnboardingLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextOnboardingLesson(lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={ONBOARDING_ID}
      basePath="/learn/lessons"
      totalLessons={TOTAL_ONBOARDING_LESSONS}
      nextLessonId={next?.id}
      finalHref="/learn/complete"
      finalLabel="Finish"
    />
  );
}
