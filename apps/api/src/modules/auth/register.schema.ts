import { z } from "zod";

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)\S+$/;

export const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(
      PASSWORD_PATTERN,
      "Password must contain a letter and a number without spaces",
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;
