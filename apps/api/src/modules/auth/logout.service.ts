import { hashRefreshToken } from "./refresh-token.js";
import { revokeAuthSession } from "./sessions/session.repository.js";

export const logoutSession = async (refreshToken: string): Promise<void> => {
  const tokenHash = hashRefreshToken(refreshToken);
  const now = new Date();
  await revokeAuthSession(tokenHash, now);
};
