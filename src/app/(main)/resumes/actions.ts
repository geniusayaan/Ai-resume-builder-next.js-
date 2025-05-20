"use server"
import prisma from "@/lib/prisma"
import { resumeDataInclude, ResumeServerData } from "@/lib/Types"
import { auth } from "@clerk/nextjs/server"
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"



export const deleteResume = async(id:string)=>{
    try {
       
        const {userId} = await auth()

    if(!userId){
        throw new Error("user not authenticated")
    }

    const resume = await prisma.resume.findUnique({
        where:{
            id,
            userId
        }
    })

    if(!resume){
        throw new Error("resume not found")
    }

    if(resume.photoUrl){
        await del(resume.photoUrl)
    }

    await prisma.workExperience.deleteMany({
        where: {
          resumeId: id,
        },
      });

      await prisma.education.deleteMany({
        where: {
          resumeId: id,
        },
      });
  
     
      await prisma.resume.delete({
        where: {
          id,
          userId,
        },
      });

    revalidatePath("/resumes");
    
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);  
    } else {
        console.log("Unknown error occurred:", error);
    }
}

    

}

export const getResumes = async()=>{
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

      if(!resumes||totalResumeCount==0) return null

      return {resumes,totalResumeCount}
}
