import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_22,
  MODULE_22_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_22.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module22LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-22/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_22_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_22_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_22_ID}
      basePath="/learn/module-22"
      lessons={MODULE_22.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-22"
      finalLabel="Back to Module 22"
    />
  );
}
