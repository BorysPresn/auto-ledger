import { createAccessToken } from "./access-token.js";
import { InvalidRefreshTokenError } from "./auth.errors.js";
import { createRefreshToken, hashRefreshToken } from "./refresh-token.js";
import { rotateAuthSession } from "./sessions/session.repository.js";

export type RefreshResult = {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
};

export const refreshTokens = async (
  currentRefreshToken: string,
): Promise<RefreshResult> => {
  const hashedCurrentRefreshToken = hashRefreshToken(currentRefreshToken);
  const refreshToken = createRefreshToken();
  const hashedNewRefreshToken = hashRefreshToken(refreshToken);
  const now = new Date();
  const session = await rotateAuthSession(
    hashedCurrentRefreshToken,
    hashedNewRefreshToken,
    now,
  );

  if (session === null) {
    throw new InvalidRefreshTokenError();
  }

  const userId = session.userId.toHexString();
  const sessionId = session._id.toHexString();
  const accessToken = await createAccessToken(userId, sessionId);
  return {
    accessToken,
    refreshToken,
    refreshTokenExpiresAt: session.expiresAt,
  };
};
