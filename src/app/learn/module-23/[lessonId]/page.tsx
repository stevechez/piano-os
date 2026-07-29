import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_23,
  MODULE_23_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_23.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module23LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-23/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_23_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_23_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_23_ID}
      basePath="/learn/module-23"
      lessons={MODULE_23.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-23"
      finalLabel="Back to Module 23"
    />
  );
}
