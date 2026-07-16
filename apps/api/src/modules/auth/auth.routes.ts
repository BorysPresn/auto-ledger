import { Router } from "express";
import { registerController } from "./register.controller.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
