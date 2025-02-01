import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import React from "react";

interface BrudscrumbsProps{
    currentStep:string;
    setCurrentStep:(step:string)=>void;
}

const Brudscrumb = ({currentStep,setCurrentStep}:BrudscrumbsProps) => {
  return (
   <div className="flex justify-center items-center">
      <Breadcrumb>
      <BreadcrumbList>
      {steps.map(step=>(
          <React.Fragment key={step.key}>
             <BreadcrumbItem>
             {step.key === currentStep ? (
                 <BreadcrumbPage>{step.title}</BreadcrumbPage>
             ):(
                 <BreadcrumbLink asChild>
                    <button onClick={()=>setCurrentStep(step.key)}>  {step.title}  </button>
                 </BreadcrumbLink>
             )}
             </BreadcrumbItem>
             <BreadcrumbSeparator className="last:hidden"/>
          </React.Fragment>
      ))}
      </BreadcrumbList>
      </Breadcrumb>
   </div>
  )
}


export default Brudscrumb