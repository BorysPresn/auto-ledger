import { setServers } from "node:dns";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { closeDatabaseConnection, connectToDatabase } from "./db/mongo.js";
import { ensureUserIndexes } from "./modules/users/users.collection.js";

async function startServer(): Promise<void> {
  if (env.DNS_SERVER) {
    setServers([env.DNS_SERVER]);
  }
  await connectToDatabase();
  console.log("Database connected");

  await ensureUserIndexes();

  const server = app.listen(env.PORT, () => {
    console.log(`Server is running at http://localhost:${env.PORT}`);
  });

  function shutdown(signal: string): void {
    console.log("Signal received: ", signal);
    server.close(async () => {
      try {
        console.log("HTTP Server closed");
        await closeDatabaseConnection();
        console.log("Database connection is closed");
      } catch (error) {
        console.error("Failed to close database connection", error);
        process.exitCode = 1;
      }
    });
  }

  process.once("SIGINT", () => {
    shutdown("SIGINT");
  });
  process.once("SIGTERM", () => {
    shutdown("SIGTERM");
  });
}

startServer().catch((error) => {
  console.error("Failed to start API", error);
  process.exitCode = 1;
});
