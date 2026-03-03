import { cache } from "react";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";

type AuthActionArgs<T extends Record<string, any>> = {
  prevState: { error?: Record<string, string[]> } | null;
  formData: FormData;
  dataSchema: z.ZodSchema<T>;
  authAction: (args: { body: T; headers?: Headers }) => Promise<any>;
  errorMessage: string;
};

export async function handleAuthAction<T extends Record<string, any>>({
  prevState: _prevState,
  formData,
  dataSchema,
  authAction,
  errorMessage,
}: AuthActionArgs<T>) {
  const validatedFields = dataSchema.safeParse(Object.fromEntries(formData));
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      success: false,
      error: {
        ...flattened.fieldErrors,
        ...(flattened.formErrors.length > 0 && { form: flattened.formErrors }),
      },
    };
  }

  try {
    const headersValue = undefined;
    await authAction({
      body: validatedFields.data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: { form: [(error as Error).message || errorMessage] },
    };
  }
}

export const getServerSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
