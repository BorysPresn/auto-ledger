import { SignJWT, jwtVerify } from "jose";
import { env } from "../../config/env.js";
import { TextEncoder } from "node:util";
import { z } from "zod";

export type AccessTokenData = {
  userId: string;
  sessionId: string;
};

const accessTokenPayloadSchema = z.object({
  sub: z.string().trim().min(1),
  sid: z.string().trim().min(1),
});

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

export const verifyAccessToken = async (
  token: string,
): Promise<AccessTokenData> => {
  const result = await jwtVerify(token, secret, { algorithms: ["HS256"] });
  const parsedResult = accessTokenPayloadSchema.parse(result.payload);

  return {
    userId: parsedResult.sub,
    sessionId: parsedResult.sid,
  };
};
