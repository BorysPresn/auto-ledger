import { type ObjectId } from "mongodb";
import { type UserDocument } from "./user.types.js";
import { getUsersCollection } from "./users.collection.js";

export const insertUser = async (user: UserDocument): Promise<ObjectId> => {
  const collection = getUsersCollection();
  const insertedId = (await collection.insertOne(user)).insertedId;
  return insertedId;
};
