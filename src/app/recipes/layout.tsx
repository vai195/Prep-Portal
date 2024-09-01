import { Metadata } from "next";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Prep Portal - Recipes",
  description:
    "Welcome to Prep Portal AI an AI tool to help user create easy healthy meal prepping recipes using AI. This is the home page where all generated recipes are displayed.",
};
export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='p-4 max-w-7xl m-auto '>{children}</main>
      <Toaster />
    </>
  );
}
