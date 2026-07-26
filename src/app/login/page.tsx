import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <AuthCard
      eyebrow="Sign In"
      heading="Welcome back."
      subheading="Continue your musical journey."
      footer={
        <>
          New to PianoOS?{" "}
          <Link href="/learn" className="text-gold hover:opacity-80">
            Start the free experience
          </Link>
        </>
      }
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthCard>
  );
}
