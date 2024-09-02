import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prep Portal - Sign In",
  description:
    "Welcome to Prep Portal AI an AI tool to help user create easy healthy meal prepping recipes using AI this is the sign in page",
};

function SignInPage() {
  return (
    <div className='flex h-screen items-center justify-center bg-amber-100 dark:bg-background'>
      <SignIn appearance={{ variables: { colorPrimary: "#0f172a" } }} />
    </div>
  );
}

export default SignInPage;
