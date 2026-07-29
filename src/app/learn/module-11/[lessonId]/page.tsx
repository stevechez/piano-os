import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_11,
  MODULE_11_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_11.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module11LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-11/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_11_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_11_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_11_ID}
      basePath="/learn/module-11"
      lessons={MODULE_11.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-11"
      finalLabel="Back to Module 11"
    />
  );
}
