import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_4, MODULE_4_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module4Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-4");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 4
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_4.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_4.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_4.lessons}
          moduleId={MODULE_4_ID}
          basePath="/learn/module-4"
          completionCopy={{
            heading: "You've completed Module 4.",
            body: "Sevenths, suspensions, and where chords come from — all part of your vocabulary now. Module 5 is on the way.",
          }}
        />
      </div>
    </div>
  );
}
