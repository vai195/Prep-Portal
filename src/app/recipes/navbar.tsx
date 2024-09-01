"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/prep.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

function Navbar() {
  const { theme } = useTheme();
  return (
    <>
      <div className='p-4 shadow bg-orange-200 dark:bg-slate-800'>
        <div className='max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between'>
          <Link href='/recipes' className='flex items-center gap-1'>
            <Image src={logo} alt='PumpUp Logo' width={70} height={70} />
            <span className='font-bold text-2xl'>PrepPortal</span>
          </Link>
          <div className='flex flex-wrap items-center gap-2'>
            <ThemeToggle />
            <UserButton
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
