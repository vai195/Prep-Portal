import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Prep Portal - Sign Up",
  description:
    "Welcome to Prep Portal AI an AI tool to help user create easy healthy meal prepping recipes using AI this is the sign up page",
};

function SignUpPage() {
  return (
    <div className='flex h-screen items-center justify-center bg-amber-100 dark:bg-background'>
      <SignUp appearance={{ variables: { colorPrimary: "#0f172a" } }} />
    </div>
  );
}

export default SignUpPage;
