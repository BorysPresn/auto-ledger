import type { Response } from "express";
import { env } from "../../config/env.js";

export const setRefreshTokenCookie = (
  response: Response,
  refreshToken: string,
  expiresAt: Date,
): void => {
  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    expires: expiresAt,
  });
};
