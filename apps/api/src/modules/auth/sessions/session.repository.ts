import type { ObjectId, WithId } from "mongodb";
import type { AuthSessionDocument } from "./auth-session.types.js";
import { getAuthSessionsCollection } from "./session.collection.js";

export const insertAuthSession = async (
  session: AuthSessionDocument,
): Promise<ObjectId> => {
  const collection = getAuthSessionsCollection();
  const insertedId = (await collection.insertOne(session)).insertedId;
  return insertedId;
};

export const rotateAuthSession = async (
  currentRefreshTokenHash: string,
  newRefreshTokenHash: string,
  now: Date,
): Promise<WithId<AuthSessionDocument> | null> => {
  const filter = {
    refreshTokenHash: currentRefreshTokenHash,
    revokedAt: null,
    expiresAt: { $gt: now },
  };
  const update = {
    $set: {
      refreshTokenHash: newRefreshTokenHash,
      updatedAt: now,
    },
  };
  const collection = getAuthSessionsCollection();

  return collection.findOneAndUpdate(filter, update, {
    returnDocument: "after",
  });
};
