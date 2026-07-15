import { type Collection } from "mongodb";
import { getDatabase } from "../../db/mongo.js";
import { type UserDocument } from "./user.types.js";

export const getUsersCollection = (): Collection<UserDocument> => {
  const db = getDatabase();
  return db.collection<UserDocument>("users");
};

export const ensureUserIndexes = async (): Promise<void> => {
  const userCollection: Collection<UserDocument> = getUsersCollection();
  await userCollection.createIndex(
    { email: 1 }, //ascending sort from A to Z; -1 descending from Z to A;
    { unique: true, name: "users_email_unique" },
  );
};
