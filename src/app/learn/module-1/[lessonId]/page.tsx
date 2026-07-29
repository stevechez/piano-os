import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_1,
  MODULE_1_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_1.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module1LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-1/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_1_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_1_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_1_ID}
      basePath="/learn/module-1"
      lessons={MODULE_1.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-1"
      finalLabel="Back to Module 1"
    />
  );
}
