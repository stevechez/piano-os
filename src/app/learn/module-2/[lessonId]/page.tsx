import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_2,
  MODULE_2_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_2.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module2LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-2/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_2_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_2_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_2_ID}
      basePath="/learn/module-2"
      lessons={MODULE_2.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-2"
      finalLabel="Back to Module 2"
    />
  );
}
