import { Router } from "express";
import { registerController } from "./register.controller.js";
import { loginController } from "./login.controller.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
