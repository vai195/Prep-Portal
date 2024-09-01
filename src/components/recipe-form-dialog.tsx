"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import LoadingButton from "./loading-button";
import { formInfo } from "@/lib/types";
import { getRecipe } from "@/app/recipes/actions";
import { auth } from "@clerk/nextjs/server";
import { useState } from "react";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  isBreakfast: z.coerce.boolean(),
  cuisine: z.string().min(1).max(25),
  isLowCal: z.coerce.boolean(),
  isVegetarian: z.coerce.boolean(),
  restrictions: z.string().optional(),
});

function RecipeFormDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isBreakfast: false,
      cuisine: "",
      isLowCal: false,
      isVegetarian: false,
      restrictions: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isSuccess = await getRecipe(values);
    setOpen(false);
    if (isSuccess.success) {
      toast({
        title: "Recipe Generated",
      });
    }
    if (!isSuccess.success && isSuccess.error) {
      toast({
        title: "Error",
        description: isSuccess.error as string,
      });
    }
    form.reset();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Generate Recipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle hidden>Generate Recipe</DialogTitle>
        <DialogDescription hidden>
          Dialog form for generating a recipe
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='cuisine'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine</FormLabel>
                  <FormControl>
                    <Input placeholder='asian, mexican, italian' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isBreakfast'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Breakfast Recipe?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isLowCal'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Low Calorie?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isVegetarian'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Vegetarian?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='restrictions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restrictions</FormLabel>
                  <FormControl>
                    <Input placeholder='peanuts, soy, gluten' {...field} />
                  </FormControl>
                  <FormDescription>
                    Put a single spaces between words.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton isLoading={form.formState.isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeFormDialog;
