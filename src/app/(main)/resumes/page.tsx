'use client'

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface Resume {
  title?: string;
  photoUrl?: string;
  [key: string]: any;  
}

function ResumesList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const GetUserId = async () => {
      try {
        const response = await fetch("/api/GetUserId", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json(); 
        setResumes(data); 
      } catch (error) {
        console.error("Error in getting resumes", error);
      }
    };

    GetUserId();
  }, []);

  const throwToResumeUrl = (resumeId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("resumeId", resumeId);
    router.push(`/editor?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap p-8 gap-3 mt-10 justify-between h-full w-full items-center">
      {resumes.length > 0 ? (
        resumes.map((resume, id) => (
          <div
            onClick={() => throwToResumeUrl(resume.id)}
            key={id}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <div className="border-1 cursor-pointer bg-white w-[180px] h-[150px] flex flex-col px-4 py-2 rounded-md">
              <div className="flex gap-2">
                {resume.photoUrl && (
                  <img src={resume.photoUrl} className="w-6 h-6 rounded-md" />
                )}
                {resume.firstName && (
                  <h3 style={{ color: resume.colorHex }}>{resume.firstName}</h3>
                )}
                {resume.lastName && (
                  <h3 style={{ color: resume.colorHex }}>{resume.lastName}</h3>
                )}
              </div>
            </div>
            <h1
              className={`text-lg font-semibold ${
                !resume.title && "text-red-700"
              }`}
            >
              {resume.title ? resume.title : "No title for this resume"}
            </h1>
          </div>
        ))
      ) : (
        <h1>No resumes yet</h1>
      )}
    </div>
  );
}

export default function Page() {
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

      {/* Wrap ResumesList inside a Suspense boundary */}
      <Suspense fallback={<div>Loading resumes...</div>}>
        <ResumesList />
      </Suspense>
    </main>
  );
}
