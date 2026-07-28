import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_6, MODULE_6_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module6Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-6");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 6
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_6.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_6.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_6.lessons}
          moduleId={MODULE_6_ID}
          basePath="/learn/module-6"
          completionCopy={{
            heading: "You've completed Module 6.",
            body: "Call and response, the safety net scale, question and answer — you're not just playing music anymore, you're making it.",
          }}
        />
      </div>
    </div>
  );
}
