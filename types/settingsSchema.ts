import { newPassword } from "@/server/actions/new-password";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(8, "Password should be at least 8 characters")
    ),
    newPassword: z.optional(
      z.string().min(8, "Password should be at least 8 characters")
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  );
