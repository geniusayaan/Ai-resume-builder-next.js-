"use client";

import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";


const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <Sun className="size-[2rem] rotate-o  scale-150 transition-all dark:-rotate-90 dark:scale-0"></Sun>
          <Moon className="size-[2rem] absolute rotate-90 scale-0 transition-all dark:scale-150"></Moon>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={()=>setTheme("light")}>
         Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme("dark")}>
         Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme("system")}>
         System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
