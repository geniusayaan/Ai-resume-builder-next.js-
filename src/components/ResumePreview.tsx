import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyle";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef:React.Ref<HTMLDivElement>;
  className?: String;
}

const ResumePreview = ({ resumeData, className,contentRef }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resume-prewiew-content"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData}/>
        <SkillSection resumeData={resumeData}/>
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email,colorHex,borderStyle } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="author photo"
          className="aspect-square object-cover"
          style={{borderRadius:borderStyle===BorderStyles.SQUARE?"0px":borderStyle===BorderStyles.CIRCLE?"999px":"15%"}}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className={`text-3xl font-semibold capitalize `} style={{color:colorHex}}>
            {firstName} {lastName}
          </p>
          <p className={`font-semibold capitalize`} style={{color:colorHex}}>{jobTitle}</p>
        </div>
        <p className="text-xs capitalize text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {phone}
          {phone && email ? " • " : ""}
          <span className="lowercase"> {email}</span>
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary ,colorHex,borderStyle} = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border-2" style={{borderColor:colorHex}}/>
      <div className="space-y-2.5 break-inside-avoid">
        <p className="text-lg font-semibold" style={{color:colorHex}}>Professional Profile</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences,colorHex,borderStyle } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2"  style={{borderColor:colorHex}}/>
      <div className="space-y-3 ">
        <p className="text-lg font-semibold">Work Experinces</p>
        {workExperiencesNotEmpty?.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-3 px-2">
            <div className="flex items-center justify-between text-sm font-semibold">
              <div className="gap-1 flex flex-col"  style={{color:colorHex}}>
                <span>{exp.position}</span>
                <p className="text-xs font-semibold text-muted-foreground">
                  {exp.company}
                </p>
              </div>

              {exp.startDate && (
                <span className="text-muted-foreground"  style={{color:colorHex}}>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>

            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({resumeData}:ResumeSectionProps){
  const {educations,colorHex,borderStyle} = resumeData
  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  

  if (!educationsNotEmpty?.length) return null;


  return (
    <>
      <hr className="border-2"  style={{borderColor:colorHex}}/>
      <div className="space-y-3 ">
        <p className="text-lg font-semibold"  style={{color:colorHex}}>Educations</p>
        {educationsNotEmpty?.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <div className="gap-1 flex flex-col">
                <span className="uppercase"  style={{color:colorHex}}>{edu.degree}</span>
               
                <p className="text-xs capitalize font-semibold text-muted-foreground">
                  {edu.school}
                </p>
              </div>

              {edu.startDate && (
                <span className="text-muted-foreground"  style={{color:colorHex}}>
                  {formatDate(edu.startDate, "MM/yyyy")} {" "}
                  {edu.endDate && edu.startDate ? "- "+formatDate(edu.endDate, "MM/yyyy") : ""}
                </span>
              )}
            </div>

            
          </div>
        ))}
      </div>
    </>
  );
}


function SkillSection({resumeData}:ResumeSectionProps){
  const {skills,colorHex,borderStyle} = resumeData;

  if(!skills?.length) return null

  return(
    <>
    <hr className="border-2"  style={{borderColor:colorHex}}/>
    <div className="space-y-3 break-inside-avoid">
      <p className="text-lg font-semibold"  style={{color:colorHex}}>Skills</p>
         <div className="flex flex-wrap gap-2 break-inside-avoid">
             {
              skills?.map((skill,index)=>(
                
                <Badge key={index} className="text-md bg-black text-white rounded-md hover:bg-balck capitalize font-semibold"  style={{background:colorHex,borderRadius:borderStyle===BorderStyles.SQUARE?"0px":borderStyle===BorderStyles.CIRCLE?"999px":"8px"}}>
                  {skill}
                  </Badge>
                
              ))
             }
         </div>
    </div>
    </>
  )
}