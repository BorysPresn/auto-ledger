import type { RequestHandler } from "express";
import { refreshTokens } from "./refresh.service.js";
import { setRefreshTokenCookie } from "./refresh-token-cookie.js";
import { InvalidRefreshTokenError } from "./auth.errors.js";

export const refreshController: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken: unknown = req.cookies.refreshToken;
    if (typeof refreshToken !== "string" || refreshToken.length === 0) {
      throw new InvalidRefreshTokenError();
    }
    const {
      accessToken,
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt,
    } = await refreshTokens(refreshToken);

    setRefreshTokenCookie(res, newRefreshToken, refreshTokenExpiresAt);
    res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof InvalidRefreshTokenError) {
      res.status(401).json({
        error: {
          code: "INVALID_REFRESH_TOKEN",
          message: "Invalid or expired refresh token",
        },
      });
      return;
    }
    next(error);
  }
};
