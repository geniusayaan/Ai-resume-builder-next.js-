import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes"
import {ClerkProvider} from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./(main)/Navbar";

export const metadata: Metadata = {
  title: {
    template:"%s - GenieResumay",
    absolute:"GenieResumay"
  },
  description: "created by ayaan mehdi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
      <body 
  className={`antialiased bg-[#f1f1f1]`}
>

  <Navbar />

        <ThemeProvider attribute={"class"}
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange>
          <Toaster/>
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
