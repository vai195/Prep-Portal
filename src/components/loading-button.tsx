import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function LoadingButton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button disabled={isLoading} type='submit'>
      {isLoading && <Loader2 className='animate-spin' />}
      {children}
    </Button>
  );
}

export default LoadingButton;
