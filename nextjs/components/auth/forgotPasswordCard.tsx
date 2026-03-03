"use client";

// External imports
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope } from "react-icons/fa6";

// Internal imports
import Card from "@/components/ui/card";
import AuthForm from "@/components/auth/authForm";
import LabelIconInput from "@/components/ui/labelIconInput";
import { formatErrorsForAlert } from "@/lib/errors";
import { forgotPasswordAction } from "@/app/actions/authActions";

export default function ForgotPasswordCard() {
  const [formState, formAction, isPending] = useActionState(
    forgotPasswordAction,
    null,
  );
  const router = useRouter();

  // Handle redirect on success or show alert on error
  useEffect(() => {
    if (formState?.success) {
      router.push("/dashboard");
      router.refresh();
    } else if (formState?.error) {
      const errorMessages = formatErrorsForAlert(formState.error);
      alert(`Error sending reset email: ${errorMessages}`);
    }
  }, [formState?.error, formState?.success, router]);

  return (
    <Card>
      <AuthForm action={formAction} isPending={isPending} submitText="Submit">
        <LabelIconInput inputID="email">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full grow"
          />
        </LabelIconInput>
      </AuthForm>
    </Card>
  );
}
