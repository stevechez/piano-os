import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_15,
  MODULE_15_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_15.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module15LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-15/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_15_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_15_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_15_ID}
      basePath="/learn/module-15"
      totalLessons={MODULE_15.lessons.length}
      nextLessonId={next?.id}
      finalHref="/learn/module-15"
      finalLabel="Back to Module 15"
    />
  );
}
