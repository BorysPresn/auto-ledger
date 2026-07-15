import { type Db, MongoClient } from "mongodb";
import { env } from "../config/env.js";

const client = new MongoClient(env.MONGODB_URI);
let database: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (database) return database;
  await client.connect();
  database = client.db(env.MONGODB_NAME);
  return database;
}

export function getDatabase(): Db {
  if (!database) {
    throw new Error("Database is not connected");
  }
  return database;
}

export async function closeDatabaseConnection(): Promise<void> {
  await client.close();
  database = null;
}
