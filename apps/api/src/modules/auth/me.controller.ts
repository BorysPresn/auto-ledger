import type { RequestHandler } from "express";
import { getCurrentUser } from "./me.service.js";

export const meController: RequestHandler = async (_req, res, next) => {
  const auth = res.locals.auth;
  if (!auth) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required",
      },
    });
    return;
  }

  try {
    const user = await getCurrentUser(auth.userId);
    if (!user) {
      res.status(401).json({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
