import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

export const recipes = sqliteTable("recipes", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  calories: integer("calories").notNull(),
  name: text("name").notNull(),
  instructions: text("instructions").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
