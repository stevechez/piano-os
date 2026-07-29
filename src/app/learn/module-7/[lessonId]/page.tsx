import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_7,
  MODULE_7_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_7.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module7LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-7/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_7_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_7_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_7_ID}
      basePath="/learn/module-7"
      lessons={MODULE_7.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-7"
      finalLabel="Back to Module 7"
    />
  );
}
