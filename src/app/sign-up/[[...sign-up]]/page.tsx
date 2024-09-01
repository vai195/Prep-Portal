import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  return (
    <div className='flex h-screen items-center justify-center bg-amber-100 dark:bg-background'>
      <SignUp appearance={{ variables: { colorPrimary: "#0f172a" } }} />
    </div>
  );
}

export default SignUpPage;
