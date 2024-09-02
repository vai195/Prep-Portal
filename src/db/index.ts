import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/driver";
import * as schema from "./schema";
// import { config } from "dotenv";
// config({ path: ".env" });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
