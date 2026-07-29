import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_3,
  MODULE_3_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_3.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module3LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-3/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_3_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_3_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_3_ID}
      basePath="/learn/module-3"
      lessons={MODULE_3.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-3"
      finalLabel="Back to Module 3"
    />
  );
}
