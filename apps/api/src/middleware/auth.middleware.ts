import type { RequestHandler } from "express";
import { verifyAccessToken } from "../modules/auth/access-token.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const authorization = req.get("authorization");
  const parts = authorization?.split(" ");
  const token = parts?.[1];
  if (parts?.length !== 2 || parts[0]?.toLowerCase() !== "bearer" || !token) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required",
      },
    });
    return;
  }

  try {
    const auth = await verifyAccessToken(token);
    res.locals.auth = auth;
    next();
  } catch {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required",
      },
    });
  }
};
