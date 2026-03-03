"use server";

import { auth } from "@/lib/auth";
import {
  LoginSchema,
  SignUpSchema,
  EmailSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
} from "@/lib/schemas";
import { headers } from "next/headers";
import { handleAuthAction } from "@/lib/authHelpers";

export async function signUpAction(
  _prevState: { error?: Record<string, string[]> } | null,
  formData: FormData,
) {
  return handleAuthAction({
    prevState: _prevState,
    formData,
    dataSchema: SignUpSchema,
    authAction: auth.api.signUpEmail,
    errorMessage: "Sign up failed",
  });
}

export async function loginAction(
  _prevState: { error?: Record<string, string[]> } | null,
  formData: FormData,
) {
  return handleAuthAction({
    prevState: _prevState,
    formData,
    dataSchema: LoginSchema,
    authAction: auth.api.signInEmail,
    errorMessage: "Login failed",
  });
}

export async function changeEmailAction(
  _prevState: { error?: Record<string, string[]> } | null,
  formData: FormData,
) {
  return handleAuthAction({
    prevState: _prevState,
    formData,
    dataSchema: EmailSchema,
    authAction: async ({ body }) =>
      await auth.api.changeEmail({ body, headers: await headers() }),
    errorMessage: "Updating email failed",
  });
}

export async function forgotPasswordAction(
  _prevState: { error?: Record<string, string[]> } | null,
  formData: FormData,
) {
  return handleAuthAction({
    prevState: _prevState,
    formData,
    dataSchema: ForgotPasswordSchema,
    authAction: auth.api.requestPasswordReset,
    errorMessage: "Request failed",
  });
}

export async function resetPasswordAction(
  _prevState: { error?: Record<string, string[]> } | null,
  formData: FormData,
) {
  return handleAuthAction({
    prevState: _prevState,
    formData,
    dataSchema: ResetPasswordSchema,
    authAction: auth.api.resetPassword,
    errorMessage: "Reset password failed",
  });
}

export async function changePasswordAction(
  _prevState: { error?: Record<string, string[]> } | null,
  formData: FormData,
) {
  return handleAuthAction({
    prevState: _prevState,
    formData,
    dataSchema: ChangePasswordSchema,
    authAction: async ({ body }) =>
      await auth.api.changePassword({ body, headers: await headers() }),
    errorMessage: "Change password failed",
  });
}

// export async function signUpAction(
//   _prevState: { error?: Record<string, string[]> } | null,
//   formData: FormData,
// ) {
//   const validatedFields = SignUpSchema.safeParse(Object.fromEntries(formData));
//   if (!validatedFields.success) {
//     return {
//       success: false,
//       error: flattenErrors(validatedFields.error),
//     };
//   }

//   try {
//     await auth.api.signUpEmail({ body: validatedFields.data });
//     return { success: true };
//   } catch (error) {
//     return {
//       success: false,
//       error: { form: [(error as Error).message || "Sign up failed"] },
//     };
//   }
// }
