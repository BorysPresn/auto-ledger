import type { RequestHandler } from "express";
import { logoutSession } from "./logout.service.js";
import { clearRefreshTokenCookie } from "./refresh-token-cookie.js";

export const logoutController: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken: unknown = req.cookies.refreshToken;
    if (typeof refreshToken === "string" && refreshToken.length > 0) {
      await logoutSession(refreshToken);
    }
    clearRefreshTokenCookie(res);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
