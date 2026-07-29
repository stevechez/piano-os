import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_12,
  MODULE_12_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_12.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module12LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-12/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_12_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_12_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_12_ID}
      basePath="/learn/module-12"
      lessons={MODULE_12.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-12"
      finalLabel="Back to Module 12"
    />
  );
}
