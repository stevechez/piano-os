import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_10,
  MODULE_10_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_10.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module10LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-10/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_10_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_10_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_10_ID}
      basePath="/learn/module-10"
      lessons={MODULE_10.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-10"
      finalLabel="Back to Module 10"
    />
  );
}
