import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_17,
  MODULE_17_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_17.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module17LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-17/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_17_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_17_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_17_ID}
      basePath="/learn/module-17"
      lessons={MODULE_17.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-17"
      finalLabel="Back to Module 17"
    />
  );
}
