import { z } from "zod";
export function formatErrorsForAlert(error: Record<string, string[]>): string {
  const errorMessages = Object.entries(error)
    .flatMap(([field, messages]) => messages.map((msg) => `${field}: ${msg}`))
    .join("\n");
  return errorMessages;
}
export function flattenErrors(error: z.ZodError) {
  const flattened = z.flattenError(error);
  return {
    ...flattened.fieldErrors,
    ...(flattened.formErrors.length > 0 && { form: flattened.formErrors }),
  };
}
