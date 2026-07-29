import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_5,
  MODULE_5_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_5.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module5LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-5/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_5_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_5_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_5_ID}
      basePath="/learn/module-5"
      lessons={MODULE_5.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-5"
      finalLabel="Back to Module 5"
    />
  );
}
