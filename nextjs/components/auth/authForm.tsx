"use client";
interface AuthFormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  submitText: string;
  isPending?: boolean;
  action?: (formData: FormData) => void | Promise<void>;
}

export default function AuthForm({
  children,
  onSubmit,
  action,
  submitText,
  isPending = false,
}: Readonly<AuthFormProps>) {
  return (
    <form onSubmit={onSubmit} action={action} className="w-full">
      <fieldset disabled={isPending} className="flex w-full flex-col gap-2">
        {children}
        <div className="form-control w-full grow">
          <button className="btn w-full shadow btn-primary" type="submit">
            {submitText}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
