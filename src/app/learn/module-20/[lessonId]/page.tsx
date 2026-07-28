import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_20,
  MODULE_20_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_20.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module20LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-20/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_20_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_20_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_20_ID}
      basePath="/learn/module-20"
      totalLessons={MODULE_20.lessons.length}
      nextLessonId={next?.id}
      finalHref="/learn/module-20"
      finalLabel="Back to Module 20"
    />
  );
}
