import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_19,
  MODULE_19_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_19.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module19LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-19/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_19_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_19_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_19_ID}
      basePath="/learn/module-19"
      totalLessons={MODULE_19.lessons.length}
      nextLessonId={next?.id}
      finalHref="/learn/module-19"
      finalLabel="Back to Module 19"
    />
  );
}
