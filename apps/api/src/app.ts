import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { env } from "./config/env.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRouter);

app.use(errorHandler);
