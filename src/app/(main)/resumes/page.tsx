import ResumePreview from "@/components/ResumePreview"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { PlusCircleIcon } from "lucide-react"

import { Metadata } from "next"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export const metadata:Metadata = {
    title:"Your resumes"
}

export default async function page(){
      
    
    const {userId} = await auth()
    if (!userId) {
        throw new Error("user not authenticated");
      }
    const resumes = await prisma.resume.findMany({where:{userId:userId}})
    console.log(resumes)

    // const throwToResumeUrl = (resumeId:string) =>{
    //     if (searchParams.get("resumeId") !== resumeId) {
    //         const newSearchParams = new URLSearchParams(searchParams);
    //         newSearchParams.set("resumeId", resumeId);
    //         window.history.replaceState(
    //           null,
    //           "",
    //           `?${newSearchParams.toString()}`
    //         );
    //       }
    // }
    return(
    
        <main>
        <div className="w-full flex px-4 p-2 space-y-1.5 mt-4 justify-center">
            <Button asChild className="w-[200px]  h-[42px]">
                <Link href={"/editor"}>
              <PlusCircleIcon/>
                Add a resume
                </Link>
            </Button>
        </div>
        <div className="flex  flex-wrap p-8 gap-3 mt-10 justify-between h-full w-full items-center">
            {
                resumes.length>0?(
                resumes.map((resume,id)=>(
                    <>
                    <div className="flex flex-col gap-2 items-center justify-center">
                  <div  key={id} className="border-4 cursor-pointer border-green-700 bg-white w-[180px] h-[150px] flex flex-col justify-center items-center rounded-md ">
                    {resume.photoUrl&&
                        <img src={`${resume.photoUrl&&resume.photoUrl}`}  className="w-8 h-8"/>
                    }
                  </div>
                  <h1 className={`text-lg font-semibold ${!resume.title&&"text-red-700"}`}>{resume.title?resume.title:"No tittle for this resume"}</h1>
                  </div>
                  </>
                ))
                
               
            ):
            (
                    <h1>No resumes yet</h1>
            
            )
            }
        </div>
        </main>
    )
}