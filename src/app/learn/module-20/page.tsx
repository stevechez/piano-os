import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_20, MODULE_20_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module20Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-20");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 20
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_20.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_20.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_20.lessons}
          moduleId={MODULE_20_ID}
          basePath="/learn/module-20"
          completionCopy={{
            heading: "You've completed Module 20.",
            body: "The blues, spread voicings, a borrowed turn, a whole mode — twenty modules of vocabulary, and you can still read anything.",
          }}
        />
      </div>
    </div>
  );
}
