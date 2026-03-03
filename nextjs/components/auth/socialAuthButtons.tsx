"'use client';";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export default function SocialAuthButtons({
  isPending = false,
}: {
  isPending?: boolean;
}) {
  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard", // where to redirect after login
    });
  };

  const handleGithubLogin = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <nav className="flex flex-row flex-wrap justify-start gap-2">
      <button
        id="google-btn"
        className="btn grow shadow btn-outline"
        disabled={isPending}
        onClick={handleGoogleLogin}
      >
        <FcGoogle /> Login with Google
      </button>
      <button
        id="github-btn"
        className="btn grow shadow btn-outline"
        disabled={isPending}
        onClick={handleGithubLogin}
      >
        <FaGithub /> Login with Github
      </button>
    </nav>
  );
}
