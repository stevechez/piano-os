import { notFound } from "next/navigation";
import { LESSONS, TOTAL_LESSONS, getLesson, getNextLesson } from "@/features/curriculum/lessons";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextLesson(lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      totalLessons={TOTAL_LESSONS}
      nextLessonId={next?.id}
    />
  );
}
