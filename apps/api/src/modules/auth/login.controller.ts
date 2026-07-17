import type { RequestHandler } from "express";
import { loginSchema } from "./login.schema.js";
import { z } from "zod";
import { loginUser } from "./login.service.js";
import { setRefreshTokenCookie } from "./refresh-token-cookie.js";
import { InvalidCredentialsError } from "./auth.errors.js";

export const loginController: RequestHandler = async (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const fields = z.flattenError(result.error).fieldErrors;
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid login data",
        fields,
      },
    });
    return;
  }

  try {
    const { user, accessToken, refreshToken } = await loginUser(result.data);
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({ user, accessToken });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      });
      return;
    }
    next(error);
  }
};
