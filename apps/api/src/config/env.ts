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
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(
    "Invalid environment variables:\n" + z.prettifyError(result.error),
  );
}

export const env = result.data;
