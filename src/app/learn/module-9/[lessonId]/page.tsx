import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_9,
  MODULE_9_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_9.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module9LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=/learn/module-9/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_9_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_9_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_9_ID}
      basePath="/learn/module-9"
      totalLessons={MODULE_9.lessons.length}
      nextLessonId={next?.id}
      finalHref="/learn/module-9"
      finalLabel="Back to Module 9"
    />
  );
}
