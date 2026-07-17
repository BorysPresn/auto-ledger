import type { ObjectId } from "mongodb";
import { createRefreshToken, hashRefreshToken } from "../refresh-token.js";
import { env } from "../../../config/env.js";
import type { AuthSessionDocument } from "./auth-session.types.js";
import { insertAuthSession } from "./session.repository.js";

export const createAuthSession = async (
  userId: ObjectId,
): Promise<{ sessionId: string; refreshToken: string }> => {
  const refreshToken = createRefreshToken();
  const refreshTokenHash = hashRefreshToken(refreshToken);
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  );
  const authSessionDocument: AuthSessionDocument = {
    userId,
    createdAt: now,
    updatedAt: now,
    expiresAt,
    refreshTokenHash,
    revokedAt: null,
  };

  const result = await insertAuthSession(authSessionDocument);
  return {
    sessionId: result.toHexString(),
    refreshToken,
  };
};
