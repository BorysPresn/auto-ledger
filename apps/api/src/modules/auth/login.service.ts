import { findUserByEmail } from "../users/user.repository.js";
import { createAccessToken } from "./access-token.js";
import { InvalidCredentialsError } from "./auth.errors.js";
import type { LoginInput } from "./login.schema.js";
import { verifyPassword } from "./password.js";
import { createAuthSession } from "./sessions/create-session.service.js";

export type LoginResult = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export const loginUser = async (data: LoginInput): Promise<LoginResult> => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new InvalidCredentialsError();
  }
  const passwordMatches = await verifyPassword(
    data.password,
    user.passwordHash,
  );
  if (!passwordMatches) {
    throw new InvalidCredentialsError();
  }
  const userIdString = user._id.toHexString();
  const { sessionId, refreshToken } = await createAuthSession(user._id);
  const accessToken = await createAccessToken(userIdString, sessionId);
  const result: LoginResult = {
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: userIdString,
    },
    accessToken,
    refreshToken,
  };
  return result;
};
