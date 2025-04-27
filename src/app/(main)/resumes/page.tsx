
import ResumeItem from "./ResumeItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/Types";

export default async function Page() {
  const { userId } = await auth();
      
      if (!userId) {
          return null;
      }
      
      const [resumes, totalResumeCount] = await Promise.all([
          prisma.resume.findMany({
              where: { userId },
              orderBy: {
                  updatedAt: "desc",
              },
              include: resumeDataInclude,
          }),
          prisma.resume.count({
              where: { userId },
          }),
      ]);
  

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="w-[200px] h-[42px]">
        <Link href="/editor">
          <PlusCircleIcon />
          Add a resume
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalResumeCount}</p>
      </div>

      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItem resume={resume} key={resume.id} />
        ))}
      </div>
    </main>
  );
}
