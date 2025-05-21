
import { EditorFormProps, resumeDataInclude } from "@/lib/Types";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import ResumePageClient from "./ResumePageClient";

export default async function Page({setResumeData}:EditorFormProps) {

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

<<<<<<< HEAD
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="w-[300px] h-[42px] rounded-full ">
        <Link href="/editor">
          <PlusCircleIcon />
          Add a resume
        </Link>
      </Button>
=======
>>>>>>> origin/main

      return (
        <ResumePageClient resumes={resumes} totalResumeCount={totalResumeCount}/>
      )
    
}
