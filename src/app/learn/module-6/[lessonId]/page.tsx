import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_6,
  MODULE_6_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_6.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module6LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-6/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_6_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_6_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_6_ID}
      basePath="/learn/module-6"
      lessons={MODULE_6.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-6"
      finalLabel="Back to Module 6"
    />
  );
}
