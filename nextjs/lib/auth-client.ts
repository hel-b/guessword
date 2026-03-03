import { createAuthClient } from "better-auth/react";
export const { signIn, signOut, verifyEmail } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // this does not work in production with environment variables
  // as the environment variables are not available at build time, so we hardcode the URL here
  // baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});
