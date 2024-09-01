import RecipeFormDialog from "@/components/recipe-form-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../../public/chef.svg";

import { db } from "@/db";
import { recipes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import RecipeCard from "@/components/recipe-card";

export default async function RecipesPage() {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");
  const recipe = await db
    .select()
    .from(recipes)
    .where(eq(recipes.userId, userId));

  return (
    <>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-xl font-bold'>All Recipes</h1>
        <RecipeFormDialog />
      </div>

      {recipe && recipe.length === 0 && (
        <div className='flex flex-col justify-center items-center gap-4 pt-10'>
          <Image
            src={logo}
            alt='picture of chef'
            width={200}
            height={200}
            style={{ width: "200px", height: "200px" }}
            priority
          />
          <h2>No recipes found</h2>
          <RecipeFormDialog />
        </div>
      )}
      {recipe && recipe.length > 0 && (
        <div className='grid md:grid-cols-2 gap-10'>
          {recipe.map((r) => {
            return <RecipeCard key={r.id} r={r} />;
          })}
        </div>
      )}
    </>
  );
}
