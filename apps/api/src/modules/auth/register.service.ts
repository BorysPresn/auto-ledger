import { MongoServerError } from "mongodb";
import { insertUser } from "../users/user.repository.js";
import type { UserDocument } from "../users/user.types.js";
import { hashPassword } from "./password.js";
import type { RegisterInput } from "./register.schema.js";
import { EmailAlreadyExistsError } from "./auth.errors.js";

export type RegisterResult = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const registerUser = async (
  data: RegisterInput,
): Promise<RegisterResult> => {
  const now = new Date();
  const passwordHash = await hashPassword(data.password);
  const userData: UserDocument = {
    createdAt: now,
    updatedAt: now,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    passwordHash,
  };
  try {
    const result = await insertUser(userData);
    return {
      id: result.toHexString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      throw new EmailAlreadyExistsError();
    }
    throw error;
  }
};
