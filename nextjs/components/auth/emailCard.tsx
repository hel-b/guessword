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
import { changeEmailAction } from "@/app/actions/authActions";

export default function EmailForm() {
  const [formState, formAction, isPending] = useActionState(
    changeEmailAction,
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
      alert(`Error updating email: ${errorMessages}`);
    }
  }, [formState?.error, formState?.success, router]);

  return (
    <Card>
      <AuthForm action={formAction} isPending={isPending} submitText="Submit">
        <LabelIconInput inputID="newEmail">
          <FaEnvelope />
          <input
            type="email"
            name="newEmail"
            id="newEmail"
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
