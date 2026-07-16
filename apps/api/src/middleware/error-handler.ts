import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  console.error("Unhandled error: ", error);
  if (
    error instanceof SyntaxError &&
    "status" in error &&
    error.status === 400
  ) {
    response.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "Invalid JSON request body",
      },
    });
  }
  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
  });
};
