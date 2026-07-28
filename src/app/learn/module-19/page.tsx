import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_19, MODULE_19_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module19Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-19");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 19
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_19.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_19.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_19.lessons}
          moduleId={MODULE_19_ID}
          basePath="/learn/module-19"
          completionCopy={{
            heading: "You've completed Module 19.",
            body: "Counting in three, the oom-pah-pah bass, a waltzed chorus — you can play in three now.",
          }}
        />
      </div>
    </div>
  );
}
