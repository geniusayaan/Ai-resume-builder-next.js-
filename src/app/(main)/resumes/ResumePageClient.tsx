"use client"
import { Button } from '@/components/ui/button';
import { ResumeValues } from '@/lib/validation';
import { Link, PlusCircleIcon } from 'lucide-react';
import React from 'react'
import GenerateAiResume from './Auto ai resume/GenerateAiResume';
import { EditorFormProps } from '@/lib/Types';
import ResumeItem from './ResumeItem';
import { useRouter } from 'next/navigation';
import { saveResume } from '../editor/actions';



interface ResumePageClientProps {
    resumes:any[];
    totalResumeCount:number;
   
}

const ResumePageClient = ({resumes,totalResumeCount}:ResumePageClientProps) => {

    const router = useRouter()

    const saveAiResume  = async (resumeData:ResumeValues) =>{
        const savedResume = await saveResume(resumeData)
        router.push(`/editor?resumeId=${savedResume.id}`)
    }

  return (
    
        <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
            <Button asChild className="rounded-full w-[200px] h-[42px]">
                <Link href="/editor">
                    <PlusCircleIcon />
                    Add a resume
                </Link>
            </Button>

            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Your resumes   
                  {totalResumeCount} </h1>
            </div>

          
                <div className='w-full h-20 '>
                    <GenerateAiResume onResumeDataGenerated={resumeData =>{ 
                      saveAiResume(resumeData)
                    }} />
                </div> 
          
                <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                    {resumes.map((resume) => (
                        <ResumeItem resume={resume} key={resume.id} />
                    ))}
                </div>
            
        </main>
    );
  
}

export default ResumePageClient
