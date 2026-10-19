import { ObjectId } from "mongodb";
import { findUserById } from "../users/user.repository.js";

export type CurrentUserResult = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const getCurrentUser = async (
  userId: string,
): Promise<CurrentUserResult | null> => {
  if (!ObjectId.isValid(userId)) {
    return null;
  }

  const id = new ObjectId(userId);
  const result = await findUserById(id);
  if (!result) return null;
  const user = {
    id: result._id.toHexString(),
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
  };
  return user;
};
