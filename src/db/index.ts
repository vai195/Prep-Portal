import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql/driver";
import * as schema from "./schema";
const client = createClient({
  url: process.env.TURSO_CONNECTION as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
