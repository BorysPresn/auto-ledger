import type { Response } from "express";
import { env } from "../../config/env.js";

export const setRefreshTokenCookie = (
  response: Response,
  refreshToken: string,
): void => {
  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  });
};
