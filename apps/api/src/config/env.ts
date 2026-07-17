import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DNS_SERVER: z.string().trim().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  MONGODB_URI: z
    .string()
    .trim()
    .min(1, { message: "MONGO_DB_URI is required" }),
  MONGODB_NAME: z
    .string()
    .trim()
    .min(1, { message: "MONGODB_DB_NAME is required" }),
  JWT_ACCESS_SECRET: z.string().trim().min(32, {
    message: "JWT_ACCESS_SECRET must contain at least 32 characters",
  }),
  ACCESS_TOKEN_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(
    "Invalid environment variables:\n" + z.prettifyError(result.error),
  );
}

export const env = result.data;
