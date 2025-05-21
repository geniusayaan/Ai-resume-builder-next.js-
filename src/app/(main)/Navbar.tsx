"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import text_logo from "../../../public/text-logo.png";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="w-full bg-white text-black shadow-sm p-2">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/resumes" className="flex items-center ">
          <Image src={logo} alt="GenieResumay Logo" width={72} height={72} priority />
           <Image src={text_logo} alt="GenieResumay Logo" width={75} height={75} priority />
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 50,
                  height: 50,
                },
              },
            }}
          >
            {pathname !== "/billing" && (
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Billing"
                  labelIcon={<CreditCard className="size-1" />}
                  href="/billing"
                />
              </UserButton.MenuItems>
            )}
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
