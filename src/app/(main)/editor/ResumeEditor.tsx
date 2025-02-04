"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeneralInform from "./forms/GeneralInform";
import PersonalInform from "./forms/PersonalInform";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Brudscrumb from "./Brudscrumb";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
// import { cn, mapToResumeValues } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounced";
import useUnLoadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "@/hooks/useAutoSave";
// import { ResumeServerData } from "@/lib/Types";
import { Prisma } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ResumeToEdit{
  resumeToEdit: null;
}


const ResumeEditor = ({resumeToEdit}:ResumeToEdit) => {
  const searchParams = useSearchParams();

  const [resumeData, setresumeData] = useState<ResumeValues>({});

  const [showSmPreview,setShowSmPreview] = useState(false)
 
  const {isSaving,hasUnSavedChanges} = useAutoSaveResume(resumeData)

  useUnLoadWarning(hasUnSavedChanges)

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  // useBeforeUnReload()

  const FormComponent = steps.find(
    (steps) => steps.key === currentStep
  )?.component;
  return (
    <div className="flex grow flex-col h-full">
      <header className=" space-y-1.5 border-b text-center">
        <div className="flex flex-col text-center justify-center p-2">
          <h1 className="lg:text-xl xl:text-xl md:text-md sm:text-sm font-bold">
            Design your resume
          </h1>
          <span className="text-muted-foreground text-sm">
            Progress will be saved automatically
          </span>
        </div>
      </header>

      <div className="flex w-full h-[75vh] p-2">
        <div className={cn("w-full md:w-1/2  space-y-2 no-scrollbar md:block  p-2 overflow-auto",showSmPreview&&"hidden")}>
          <Brudscrumb
            currentStep={currentStep}
            setCurrentStep={setStep}
          ></Brudscrumb>
          {FormComponent && (
            <FormComponent
              resumeData={resumeData}
              setResumeData={setresumeData}
            />
          )}
        </div>
        <div className="grow border-r"></div>
        <ResumePreviewSection resumeData={resumeData} setResumeData={setresumeData} className={cn(showSmPreview&&"flex")}></ResumePreviewSection>
      </div>

      <Footer isSaving={isSaving} currentStep={currentStep} setCurrentStep={setStep} showSmPreview={showSmPreview} setShowSmPreview={setShowSmPreview}/>
    </div>
  );
};

export default ResumeEditor;
