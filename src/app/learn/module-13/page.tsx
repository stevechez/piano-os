import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_13, MODULE_13_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module13Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-13");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 13
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_13.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_13.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_13.lessons}
          moduleId={MODULE_13_ID}
          basePath="/learn/module-13"
          completionCopy={{
            heading: "You've completed Module 13.",
            body: "Same four chords, a different home — you have two homes now, major and minor, and you know how to arrive at either one.",
          }}
        />
      </div>
    </div>
  );
}
