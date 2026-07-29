import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_4,
  MODULE_4_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_4.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module4LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-4/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_4_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_4_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_4_ID}
      basePath="/learn/module-4"
      lessons={MODULE_4.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-4"
      finalLabel="Back to Module 4"
    />
  );
}
