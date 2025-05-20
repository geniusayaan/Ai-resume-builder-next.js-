import { Button } from "@/components/ui/button";
import { steps } from "./steps";
import Link from "next/link";
import { FileUser, PenLine } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import GenerateAiResume from "../resumes/Auto ai resume/GenerateAiResume";
import { saveResume } from "./actions";
import { ResumeValues } from "@/lib/validation";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface FooterProps {
  currentStep: String;
  setCurrentStep: (step: string) => void;
  showSmPreview: boolean;
  setShowSmPreview: (show: boolean) => void;
  isSaving:boolean;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmPreview,
  setShowSmPreview,
  isSaving
}: FooterProps) {

  const searchParams = useSearchParams()



  const resumeId =  searchParams.get("resumeId") || undefined;


  const saveAiResume  = async (resumeData:ResumeValues) =>{
          await saveResume({...resumeData,id:resumeId})
 window.location.reload()
          
      }
  
  
  const previousStep = steps.find(
    (_, i) => steps[i + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find((_, i) => steps[i - 1]?.key === currentStep)?.key;

  return (
    <footer className="w-full overflow-hidden pt-2 flex items-center justify-center  p-2  border-t">
      <div className="flex gap-2 sm:gap-16 md:gap-20 lg:gap-32 xl:gap-32  justify-between  md:px-4 sm:px-2 lg:px-20 xl:px-24  items-center w-full">

        
         
         <div className="flex w-full items-center justify-between px-4 md:hidden">
         <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowSmPreview(!showSmPreview)}
          className="md:hidden"
        >
          {showSmPreview ? <PenLine /> : <FileUser />}
        </Button>
        <div className="flex gap-4 items-center justify-center">
         <Button
           className="w-[65px] h-[35px] px-4  text-base md:w-[150px] md:h-[40px]"
           disabled={!previousStep}
           variant={"secondary"}
           onClick={() =>
             previousStep ? setCurrentStep(previousStep) : undefined
           }
         >
           Previous
         </Button>

         <Button
           className="w-[65px] h-[35px] px-4 text-base md:w-[150px] md:h-[40px]"
           disabled={!nextStep}
           onClick={() => (nextStep ? setCurrentStep(nextStep) : undefined)}
         >
           Next
         </Button>

         <Link href={"/resumes"}><p>Close</p></Link>

         </div>
      
         </div>

         <div className="flex ">
           <GenerateAiResume onResumeDataGenerated={resumeData =>{ 
                      saveAiResume(resumeData)

                     
                    
                    }} />
         </div>
       
          <div className="hidden justify-between  w-full items-center md:flex">
            <div className="flex gap-2">
          <Button
            className="w-[65px] h-[25px] px-4  text-sm md:w-[150px] md:h-[40px]"
            disabled={!previousStep}
            variant={"secondary"}
            onClick={() =>
              previousStep ? setCurrentStep(previousStep) : undefined
            }
          >
            Previous
          </Button>
          <Button
            className="w-[65px] h-[25px] px-4 cursor-pointer text-sm md:w-[150px] md:h-[40px]"
            disabled={!nextStep}
            onClick={() => (nextStep ? setCurrentStep(nextStep) : undefined)}
          >
            Next


          </Button>



          </div>

        <div className="text-muted-foreground flex gap-8 justify-between items-center" >
                  <Link href={"/resumes"}><p>Close</p></Link>


          <div className={cn("text-muted-foreground opacity-0",isSaving&&"opacity-100")}>
          ...Saving
        </div>
        </div>
        </div>
        

        </div>
     
    </footer>
  );
}
