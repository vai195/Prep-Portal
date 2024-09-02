"use server";

import { db } from "@/db";
import { recipes } from "@/db/schema";
import openai from "@/lib/openai";
import { formInfo } from "@/lib/types";
import { generateRandomString } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getRecipe(values: formInfo) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You recipe generator bot who makes recipes specifcally for healthy meal prepping based on what the user wants. Output your answer in JSON format: title a very specifc of the recipe, instructions an array of instructions to make the recipe with a # at the end of each instruction do not number the instructions, calories a number of estimated calories. make this response max 6 sentances",
        },
        {
          role: "user",
          content: `Give me a ${values.cuisine} cuisine recipe ${
            values.isBreakfast ? "that is a breakfast food, " : ""
          }  ${values.isLowCal ? "that is low in calories, " : ""} ${
            values.restrictions
              ? "and does not include " +
                values.restrictions.split(" ").join(", ")
              : ""
          } ${values.isVegetarian ? " and that is vegetarian" : ""}`,
        },
      ],
    });
    // console.log(completion.choices[0].message.content);
    if (completion.choices[0].message.content) {
      const recipe = JSON.parse(completion.choices[0].message.content);
      const id = generateRandomString(16);
      await db.insert(recipes).values({
        userId: userId,
        id: id,
        name: recipe.title,
        instructions: recipe.instructions,
        calories: recipe.calories,
      });
    } else {
      return { error: "Error generating recipe" };
    }
    revalidatePath("/recipes");
    return { success: true };
  } catch (error) {
    return { error: error ? error.toString() : "Error generating recipe" };
  }
}

export const deleteRecipe = async (id: string) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  try {
    await db
      .delete(recipes)
      .where(and(eq(recipes.id, id), eq(recipes.userId, userId)));
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/recipes");
  return { success: true };
};
