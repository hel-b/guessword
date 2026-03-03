"use client";

// External imports
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaKey } from "react-icons/fa6";

// Internal imports
import Card from "@/components/ui/card";
import AuthForm from "@/components/auth/authForm";
import LabelIconInput from "@/components/ui/labelIconInput";
import SocialAuthButtons from "@/components/auth/socialAuthButtons";
import { formatErrorsForAlert } from "@/lib/errors";
import { loginAction } from "@/app/actions/authActions";

export default function LoginCard() {
  const [formState, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();

  // Handle redirect on success or show alert on error
  useEffect(() => {
    if (formState?.success) {
      router.push("/dashboard");
      router.refresh();
    } else if (formState?.error) {
      const errorMessages = formatErrorsForAlert(formState.error);
      alert(`Error logging in: ${errorMessages}`);
    }
  }, [formState?.error, formState?.success, router]);

  return (
    <Card>
      <AuthForm action={formAction} isPending={isPending} submitText="Login">
        <LabelIconInput inputID="email">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="grow"
          />
        </LabelIconInput>
        <LabelIconInput inputID="password">
          <FaKey />
          <input
            type="password"
            name="password"
            id="password"
            minLength={8}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="grow"
          />
        </LabelIconInput>
        <label className="label">
          <Link href="/change-password" className="label-text-alt link">
            Forgot Password?
          </Link>
        </label>
      </AuthForm>
      <p>Or sign-in with social:</p>
      <SocialAuthButtons />
    </Card>
  );
}
