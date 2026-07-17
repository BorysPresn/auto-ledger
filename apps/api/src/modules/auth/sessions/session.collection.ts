import type { Collection } from "mongodb";
import { getDatabase } from "../../../db/mongo.js";
import type { AuthSessionDocument } from "./auth-session.types.js";

export const getAuthSessionsCollection =
  (): Collection<AuthSessionDocument> => {
    const db = getDatabase();
    return db.collection<AuthSessionDocument>("authSessions");
  };

export const ensureAuthSessionIndexes = async (): Promise<void> => {
  const sessionCollection: Collection<AuthSessionDocument> =
    getAuthSessionsCollection();

  await sessionCollection.createIndex(
    { refreshTokenHash: 1 },
    { unique: true, name: "auth_sessions_refresh_token_hash_unique" },
  );
  await sessionCollection.createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: "auth_sessions_expires_at_ttl" },
  );
};
