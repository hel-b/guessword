"use client";

import { useSearchParams } from "next/navigation";

import ForgotPasswordCard from "@/components/auth/forgotPasswordCard";
import ChangePasswordCard from "@/components/auth/changePasswordCard";
import ResetPasswordCard from "@/components/auth/resetPasswordCard";

export default function ClientPasswords({ isSession }: { isSession: boolean }) {
  const token = useSearchParams().get("token");
  return (
    <>
      <div className="prose prose-lg text-center lg:text-left">
        <h1 className="font-bold text-nowrap">Update Password</h1>
        <p>
          {token || isSession
            ? "Please provide a new password."
            : "Please enter your email and we'll send you a link to reset your password."}
        </p>
      </div>
      {!token && !isSession && <ForgotPasswordCard />}
      {!token && isSession && <ChangePasswordCard />}
      {token && <ResetPasswordCard token={token} />}
    </>
  );
}
