import { SignJWT } from "jose";
import { env } from "../../config/env.js";
import { TextEncoder } from "node:util";

const secret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);

export const createAccessToken = async (
  userId: string,
  sessionId: string,
): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ sid: sessionId })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt(now)
    .setExpirationTime(now + env.ACCESS_TOKEN_TTL_SECONDS)
    .sign(secret);

  return token;
};
