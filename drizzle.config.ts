// import type { Config } from "drizzle-kit";
// import { config } from "dotenv";

// config({ path: ".env" });

// export default {
//   dialect: "sqlite",
//   schema: "./src/db/schema.ts",
//   out: "./src/db/migrations",
//   driver: "turso",
//   dbCredentials: {
//     url: process.env.TURSO_DATABASE_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN!,
//   },
//   strict: true,
//   verbose: true,
// } satisfies Config;

import { defineConfig } from "drizzle-kit";
// import { config } from "dotenv";
// config({ path: ".env" });

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  strict: true,
  verbose: true,
});
