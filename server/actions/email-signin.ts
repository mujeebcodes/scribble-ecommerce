"use server";
import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { twoFactorTokens, users } from "../schema";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "./token";
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

const action = createSafeActionClient();

export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Email not found" };
      }

      if (!existingUser?.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );

        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Confirmation Email Sent!" };
      }

      if (existingUser.twoFactorEnabled && existingUser.email) {
        if (code) {
          const twoFactorToken = await getTwoFactorTokenByEmail(
            existingUser.email
          );

          if (!twoFactorToken) {
            return { error: "Invalid token" };
          }

          if (twoFactorToken.token !== code) {
            return { error: "Invalid token" };
          }

          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            return { error: "Expired token" };
          }

          await db
            .delete(twoFactorTokens)
            .where(eq(twoFactorTokens.id, twoFactorToken.id));
        } else {
          const newTwoFactorToken = await generateTwoFactorToken(
            existingUser.email
          );

          if (!newTwoFactorToken) {
            return { error: "Token not generated" };
          }

          await sendTwoFactorTokenByEmail(
            newTwoFactorToken[0].email,
            newTwoFactorToken[0].token
          );
          return { twoFactor: "Two Factor Token Sent!" };
        }
      }

      await signIn("credentials", { email, password, redirectTo: "/" });

      return { success: email };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Wrong credentials" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
  }
);
