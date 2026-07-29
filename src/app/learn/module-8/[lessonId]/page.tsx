import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_8,
  MODULE_8_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_8.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module8LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-8/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_8_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_8_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_8_ID}
      basePath="/learn/module-8"
      lessons={MODULE_8.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-8"
      finalLabel="Back to Module 8"
    />
  );
}
