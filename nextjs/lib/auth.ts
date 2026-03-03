import { betterAuth } from "better-auth";
import { getDB } from "./db/connection";
import { sendEmail } from "./email";
import { nextCookies } from "better-auth/next-js";
// import { SymmetricCrypto } from "./crypto";

export const auth = betterAuth({
  account: {
    encryptOAuthTokens: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: getDB("users"),
  plugins: [nextCookies()],
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendEmail({
          from: process.env.NOREPLY_EMAIL ?? "noreply@cyberalcove.com",
          to: user.email || newEmail, // verification email must be sent to the current user email to approve the change
          subject: "Approve your email change",
          text: [
            "Thanks for using GuessWord!",
            "Click the link to approve the email change:",
            "\n\n",
            url,
            "\n\n",
            "If you did not request an email change, please contact brian@cyberalcove.com.",
          ].join(" "),
        });
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const urlObj = new URL(url);
      urlObj.searchParams.set("callbackURL", "/change-password/");
      await sendEmail({
        from: process.env.NOREPLY_EMAIL ?? "noreply@cyberalcove.com",
        to: user.email,
        subject: "Reset your password",
        text: [
          "Thanks for using GuessWord!",
          "Click the link to reset your password:",
          "\n\n",
          urlObj.toString(),
          "\n\n",
          "If you did not request a password reset,",
          "please contact brian@cyberalcove.com.",
        ].join(" "),
      });
    },
    resetPasswordTokenExpiresIn: 1800,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const urlObj = new URL(url);
      urlObj.searchParams.set("callbackURL", "/verify-email/");
      await sendEmail({
        from: process.env.NOREPLY_EMAIL ?? "noreply@cyberalcove.com",
        to: user.email,
        subject: "Verify your email address",
        text: [
          "Thanks for creating a GuessWord account!",
          "Please confirm your email address by clicking the link below:",
          "\n\n",
          url,
          "\n\n",
          "If you did not create an account, please contact brian@cyberalcove.com.",
        ].join(" "),
      });
    },
    sendOnSignIn: true,
  },
  // databaseHooks: {
  //   account: {
  //     create: {
  //       before: async (account) => {
  //         return {
  //           data: {
  //             ...account,
  //             accessToken: await SymmetricCrypto.encrypt(account.accessToken),
  //             refreshToken: await SymmetricCrypto.encrypt(account.refreshToken),
  //           },
  //         };
  //       },
  //     },
  //     update: {
  //       before: async (account) => {
  //         return {
  //           data: {
  //             ...account,
  //             accessToken: await SymmetricCrypto.encrypt(account.accessToken),
  //             refreshToken: await SymmetricCrypto.encrypt(account.refreshToken),
  //           },
  //         };
  //       },
  //     },
  //   },
  // },
});
