import type { ObjectId } from "mongodb";

export type AuthSessionDocument = {
  userId: ObjectId;
  refreshTokenHash: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
};
