import { type ObjectId, type WithId } from "mongodb";
import { type UserDocument } from "./user.types.js";
import { getUsersCollection } from "./users.collection.js";

export const insertUser = async (user: UserDocument): Promise<ObjectId> => {
  const collection = getUsersCollection();
  const insertedId = (await collection.insertOne(user)).insertedId;
  return insertedId;
};

export const findUserByEmail = async (
  email: string,
): Promise<WithId<UserDocument> | null> => {
  const user = await getUsersCollection().findOne({ email });
  return user;
};
