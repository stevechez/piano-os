import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_25,
  MODULE_25_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_25.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module25LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-25/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_25_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_25_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_25_ID}
      basePath="/learn/module-25"
      lessons={MODULE_25.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-25"
      finalLabel="Back to Module 25"
    />
  );
}
