import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_18, MODULE_18_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module18Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-18");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 18
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_18.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_18.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_18.lessons}
          moduleId={MODULE_18_ID}
          basePath="/learn/module-18"
          completionCopy={{
            heading: "You've completed Module 18.",
            body: "Three chords, a shuffle, a turnaround, a whole 12-bar form — you can play the blues now.",
          }}
        />
      </div>
    </div>
  );
}
