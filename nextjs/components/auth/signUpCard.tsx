"use client";

// External imports
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa6";

// Internal imports
import Card from "@/components/ui/card";
import AuthForm from "@/components/auth/authForm";
import LabelIconInput from "@/components/ui/labelIconInput";
import SocialAuthButtons from "@/components/auth/socialAuthButtons";
import { formatErrorsForAlert } from "@/lib/errors";
import { signUpAction } from "@/app/actions/authActions";

export default function SignUpCard() {
  const [formState, formAction, isPending] = useActionState(signUpAction, null);
  const router = useRouter();

  // Handle redirect on success or show alert on error
  useEffect(() => {
    if (formState?.success) {
      router.push("/dashboard");
    } else if (formState?.error) {
      const errorMessages = formatErrorsForAlert(formState.error);
      alert(`Error signing up: ${errorMessages}`);
    }
  }, [formState?.error, formState?.success, router]);

  return (
    <Card>
      <AuthForm action={formAction} submitText="Sign Up">
        <LabelIconInput inputID="name">
          <FaUser />
          <input
            type="text"
            name="name"
            id="name"
            maxLength={32}
            placeholder="Name"
            required
            autoComplete="name"
            className="grow"
          />
        </LabelIconInput>
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
            required
            className="grow"
          />
        </LabelIconInput>
        <LabelIconInput inputID="confirmPassword">
          <FaKey />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength={8}
            placeholder="Re-enter Password"
            required
            className="grow"
          />
        </LabelIconInput>
      </AuthForm>
      <p>Or sign-in with social:</p>
      <SocialAuthButtons />
    </Card>
  );
}
