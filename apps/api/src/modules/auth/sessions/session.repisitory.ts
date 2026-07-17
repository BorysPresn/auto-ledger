import type { ObjectId } from "mongodb";
import type { AuthSessionDocument } from "./auth-session.types.js";
import { getAuthSessionsCollection } from "./session.collection.js";

export const insertAuthSession = async (
  session: AuthSessionDocument,
): Promise<ObjectId> => {
  const collection = getAuthSessionsCollection();
  const insertedId = (await collection.insertOne(session)).insertedId;
  return insertedId;
};
