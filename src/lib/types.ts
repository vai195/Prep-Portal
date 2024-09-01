import { z } from "zod";
import { recipes } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const recipeSchema = createInsertSchema(recipes, {
  name: z.string(),
  instructions: z.string(),
  calories: z.number(),
}).omit({ id: true, createdAt: true });

export interface formInfo {
  isBreakfast: boolean;
  cuisine: string;
  isLowCal: boolean;
  isVegetarian: boolean;
  restrictions?: string | undefined;
}
