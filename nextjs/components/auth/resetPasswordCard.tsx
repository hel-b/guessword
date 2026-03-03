"use client";

// External imports
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa6";

// Internal imports
import Card from "@/components/ui/card";
import AuthForm from "@/components/auth/authForm";
import LabelIconInput from "@/components/ui/labelIconInput";
import { formatErrorsForAlert } from "@/lib/errors";
import { resetPasswordAction } from "@/app/actions/authActions";

export default function ResetPasswordCard({ token }: { token: string }) {
  const [formState, formAction, isPending] = useActionState(
    resetPasswordAction,
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
      alert(`Error resetting password: ${errorMessages}`);
    }
  }, [formState?.error, formState?.success, router]);

  return (
    <Card>
      <AuthForm action={formAction} isPending={isPending} submitText="Submit">
        <LabelIconInput inputID="newPassword">
          <FaKey />
          <input type="hidden" name="token" value={token || ""} />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            minLength={8}
            placeholder="New Password"
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
            placeholder="Re-enter New Password"
            required
            className="grow"
          />
        </LabelIconInput>
      </AuthForm>
    </Card>
  );
}
