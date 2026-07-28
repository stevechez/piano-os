import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_14,
  MODULE_14_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_14.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module14LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-14/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_14_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_14_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_14_ID}
      basePath="/learn/module-14"
      totalLessons={MODULE_14.lessons.length}
      nextLessonId={next?.id}
      finalHref="/learn/module-14"
      finalLabel="Back to Module 14"
    />
  );
}
