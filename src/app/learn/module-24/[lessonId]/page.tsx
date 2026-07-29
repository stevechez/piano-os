import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_24,
  MODULE_24_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_24.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module24LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-24/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_24_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_24_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_24_ID}
      basePath="/learn/module-24"
      totalLessons={MODULE_24.lessons.length}
      nextLessonId={next?.id}
      finalHref="/learn/module-24"
      finalLabel="Back to Module 24"
    />
  );
}
