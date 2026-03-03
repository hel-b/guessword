import { ReactNode } from "react";
interface LabelIconInputProps {
  children: ReactNode;
  inputID: string;
}

function LabelIconInput({ children, inputID }: Readonly<LabelIconInputProps>) {
  return (
    <label
      htmlFor={inputID}
      className={`input-bordered input flex w-full items-center gap-2 has-valid:input-success has-invalid:has-[input:not(:placeholder-shown)]:input-error`}
    >
      {children}
    </label>
  );
}

export default LabelIconInput;
