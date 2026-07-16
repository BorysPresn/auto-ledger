import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRouter);

app.use(errorHandler);
