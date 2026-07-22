import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <AuthCard
      eyebrow="Create Account"
      heading="Welcome to PianoOS"
      subheading="Begin your musical journey."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:opacity-80">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm redirectTo={redirectTo} />
    </AuthCard>
  );
}
