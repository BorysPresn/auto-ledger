import type { AccessTokenData } from "../modules/auth/access-token.js";

declare global {
  namespace Express {
    interface Locals {
      auth?: AccessTokenData;
    }
  }
}

export {};
