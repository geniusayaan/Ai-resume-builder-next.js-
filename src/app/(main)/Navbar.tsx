"use client";

import Image from "next/image";
import logo from "../../assets/logo.png";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { usePathname } from 'next/navigation';
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import {dark} from "@clerk/themes"

const Navbar = () => {
  const {theme} = useTheme()
  const pathname = usePathname()
  return (
    <header className="w-full overflow-hidden  shadow-sm p-2">
      <div className=" w-full sm:px-3 md:px-3 lg:px-7 xl:px-8 flex justify-between items-center">
        
        <Link href={"/billing"} className="flex items-center gap-2">
          {<Image src={logo} alt="" width={40} height={40} />}
          <span className="md:text-sm font-normal sm:text-sm lg:text-lg xl:text-lg xl:font-bold lg:font-bold ">Ai resume builder</span>
        </Link>
        <div className="flex items-center  gap-6 md:gap-36 lg:gap-[100px] xl:gap-[120px]">
        <ThemeToggle/>
        <UserButton
          appearance={{
            baseTheme:theme==="dark"?dark:undefined,
            elements: {
              avatarBox: {
                width: 35,
                height: 35,
              },
            },
          }}
        >

          {pathname!=="/billing"&&
          <UserButton.MenuItems>
            <UserButton.Link
           
            label="billing"
            labelIcon={<CreditCard className="size-4"/>}
            href="/billing"/>
            </UserButton.MenuItems>
       
          }
           </UserButton>
           </div>
      </div>
    </header>
  );
};

export default Navbar;
