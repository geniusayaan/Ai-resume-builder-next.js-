
import { EditorFormProps, resumeDataInclude } from "@/lib/Types";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import ResumePageClient from "./ResumePageClient";

 async function Page() {

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
        <ResumePageClient resumes={resumes} totalResumeCount={totalResumeCount}/>
      )
    
}

export default Page
