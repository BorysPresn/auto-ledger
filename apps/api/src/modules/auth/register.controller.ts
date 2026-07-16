import type { RequestHandler } from "express";
import { registerSchema } from "./register.schema.js";
import { registerUser } from "./register.service.js";
import { EmailAlreadyExistsError } from "./auth.errors.js";
import { z } from "zod";

export const registerController: RequestHandler = async (req, res, next) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const fields = z.flattenError(result.error).fieldErrors;
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid registration data",
        fields,
      },
    });
    return;
  }

  try {
    const user = await registerUser(result.data);
    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      res.status(409).json({
        error: {
          code: "EMAIL_ALREADY_EXISTS",
          message: error.message,
        },
      });
      return;
    }
    next(error);
  }
};
