import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteRecipe } from "@/app/recipes/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface RecipeCardProps {
  userId: string;
  id: string;
  calories: number;
  name: string;
  instructions: string;
  createdAt: string;
}
function RecipeCard({ r }: { r: RecipeCardProps }) {
  return (
    <Card className='shadow bg-orange-200 dark:bg-slate-800'>
      <CardHeader>
        <CardTitle>{r.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className='flex flex-col gap-1'>
          {r.instructions
            .split("#")
            .slice(0, -1)
            .map((i, index) => (
              <li key={index}>
                {index +
                  1 +
                  ". " +
                  (i.charAt(0) === "," ? i.slice(1) : i.slice())}
              </li>
            ))}
        </ol>
        <p className='mt-3'>{"Calories: " + r.calories}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <p>{"Created at: " + new Date(r.createdAt).toLocaleDateString()}</p>
        <form>
          <Button
            type='submit'
            variant='destructive'
            formAction={deleteRecipe.bind(null, r.id)}>
            <Trash />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
