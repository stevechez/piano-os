import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_21,
  MODULE_21_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_21.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module21LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-21/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_21_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_21_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_21_ID}
      basePath="/learn/module-21"
      lessons={MODULE_21.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-21"
      finalLabel="Back to Module 21"
    />
  );
}
