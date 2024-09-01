import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className='flex h-screen items-center justify-center bg-amber-100 dark:bg-background'>
      <SignIn appearance={{ variables: { colorPrimary: "#0f172a" } }} />
    </div>
  );
}

export default SignInPage;
