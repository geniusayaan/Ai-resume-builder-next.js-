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
      <Button variant="ghost" size="icon">
  <Sun className="h-8 w-8 rotate-0 scale-90 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-9 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
