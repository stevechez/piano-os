import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_26,
  MODULE_26_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_26.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module26LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-26/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_26_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_26_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_26_ID}
      basePath="/learn/module-26"
      lessons={MODULE_26.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-26"
      finalLabel="Back to Module 26"
    />
  );
}
