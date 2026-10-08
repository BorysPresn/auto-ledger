import type { CookieOptions, Response } from "express";
import { env } from "../../config/env.js";

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
} satisfies CookieOptions;

export const setRefreshTokenCookie = (
  response: Response,
  refreshToken: string,
  expiresAt: Date,
): void => {
  response.cookie("refreshToken", refreshToken, {
    ...refreshTokenCookieOptions,
    expires: expiresAt,
  });
};

export const clearRefreshTokenCookie = (response: Response): void => {
  response.clearCookie("refreshToken", refreshTokenCookieOptions);
};
