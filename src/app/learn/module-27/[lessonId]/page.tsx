import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  MODULE_27,
  MODULE_27_ID,
  getModuleLesson,
  getNextModuleLesson,
} from "@/features/curriculum/modules";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return MODULE_27.lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function Module27LessonPage({
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
    redirect(`/login?redirectTo=/learn/module-27/${lessonId}`);
  }

  const lesson = getModuleLesson(MODULE_27_ID, lessonId);

  if (!lesson) {
    notFound();
  }

  const next = getNextModuleLesson(MODULE_27_ID, lessonId);

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      moduleId={MODULE_27_ID}
      basePath="/learn/module-27"
      lessons={MODULE_27.lessons}
      nextLessonId={next?.id}
      finalHref="/learn/module-27"
      finalLabel="Back to Module 27"
    />
  );
}
