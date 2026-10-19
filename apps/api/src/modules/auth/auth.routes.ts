import { Router } from "express";
import { registerController } from "./register.controller.js";
import { loginController } from "./login.controller.js";
import { refreshController } from "./refresh.controller.js";
import { logoutController } from "./logout.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { meController } from "./me.controller.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

authRouter.post("/refresh", refreshController);
authRouter.post("/logout", logoutController);

authRouter.get("/me", requireAuth, meController);
