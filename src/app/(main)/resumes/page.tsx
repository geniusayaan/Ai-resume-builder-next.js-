"use client"
import { Button } from "@/components/ui/button";
import { ResumeValues } from "@/lib/validation";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default  function Page() {

  const router = useRouter()

    const searchParams = useSearchParams();
  

  const [resumes,setResumes] = useState<ResumeValues[]>([])

 

  useEffect(()=>{
  const GetResumes = async ()=>{

    const response = await fetch("/api/GetUserId",{
      method:"GET"
    })
  
    const resumesData = await response.json()
  
    if(resumesData.error){
      throw new Error(resumesData.error)
    }
  
    setResumes(resumesData)
  
  }
  GetResumes()
  },[])

  const throwToUrl = (resumeId:any)=>{
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("resumeId", resumeId);

    router.push(`/editor?${newSearchParams.toString()}`
    );
  } 
  


  return (
    <main>
      <div className="w-full flex px-4 p-2 space-y-1.5 mt-4 justify-center">
        <Button asChild className="w-[200px] h-[42px]">
          <Link href={"/editor"}>
            <PlusCircleIcon />
            Add a resume
          </Link>
        </Button>
      </div>

<div className="flex flex-wrap w-full  items-center justify-start gap-4 p-7">
{resumes?.map((resume,id)=>(
  

  <div key={id} className="flex  flex-col  gap-2 items-center">
    
  <div onClick={(e)=>throwToUrl(resume.id)}  className="border cursor-pointer w-[80px] h-[80px] md:w-[140px] lg:w-[180px] xl:w-[200px] sm:h-[120px] sm:w-[120px] md:h-[140px] lg:h-[180px] xl:h-[200px] p-2 text-2xl flex flex-col items-center border-black  dark:border-white"></div>
  <h3 className="capitalize">{resume.title&&resume.title.length>7?resume.title.slice(0,7)+"...":resume.title}</h3>
  </div>

)
)}
</div>
     
    </main>
  );
}
