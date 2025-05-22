import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast';
import { GenerateResumeInput, resumeSchema, ResumeValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { GenerateResumeData } from '../../editor/forms/actions';
import { Textarea } from '@/components/ui/textarea';
import { saveResume } from '../../editor/actions';
import { usePathname, useRouter } from 'next/navigation';



interface GenerateAiResumeProps {
   onResumeDataGenerated:(resumeData:ResumeValues) => void;
   
}

const GenerateAiResume = ({onResumeDataGenerated}:GenerateAiResumeProps) => {
     const pathname = usePathname()
        const [showInputDialog,setShowInputDilog]  = useState(false)
    
  return (
    <>
    <Button className='rounded-full space-y-1 w-[7rem] h-[1.5rem] sm:h-[2rem] sm:w-[9rem]
    md:h-[2rem] md:w-[8rem] lg:h-[3rem] lg:w-[9rem] xl:h-[3rem] xl:w-[10rem] hover:bg-purple-900 bg-purple-950 text-white' onClick={()=>setShowInputDilog(true)}>{pathname==="/editor"?"Update with AI":"Generate With AI"}   
    </Button>
    
   <InputDialog onResumeDataGenerated={(resumeData=>{
    onResumeDataGenerated(resumeData)

       setShowInputDilog(false)
   })} open={showInputDialog} onOpenChange={setShowInputDilog}/>
   </>
  )
}

export default GenerateAiResume




interface InputDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onResumeDataGenerated: (resumeData: ResumeValues) => void;
}

export function InputDialog({ open, onOpenChange, onResumeDataGenerated }: InputDialogProps) {
    const { toast } = useToast();
    const form = useForm<ResumeValues>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            description: "",
        },
    });




    const questions = [
  { key: "name", label: "What's your name?" },
  { key: "age", label: "What's your age?" },
  { key: "city", label: "Which city do you live in?" },
  { key: "job", label: "What's your current job or goal?" },
  { key: "Country", label: "Which Country do you live?" },
  { key: "Email", label: "What's your email?" },
  { key: "Phone ", label: "What's your Phone no.?" },
  { key: "skills", label: "What are  your skills?" },
  { key: "workExperiences", label: "What work have you done (define it)?" },
  { key: "educations", label: "What about your education (define in brief)?" },
];

 

const [step, setStep] = useState(0);

const [currentAnswer, setCurrentAnswer] = useState("");
const [userDescription, setUserDescription] = useState("");

const handleNext = async () => {
  const { key } = questions[step];

  setUserDescription((prev) => 
    prev ? `${prev}, ${key}: ${currentAnswer}` : `${key}: ${currentAnswer}`
  );

  setCurrentAnswer("");

  form.setValue("description", "");
 
  if (step < questions.length - 1) {
    setStep(step + 1);
  } else {
               const response = await GenerateResumeData(userDescription);

            onResumeDataGenerated(response);

            console.log("object")
            
                

  }
};


    const onSubmit = async () => {
        try {
            handleNext()
           
            
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate AI Resume</DialogTitle>
                    <DialogDescription>
                        Describe this resume, and the AI will generate an optimized resume for you.
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>{questions[step].label}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        value={currentAnswer}
                                        onChange={(e) => setCurrentAnswer(e.target.value)}
                                        placeholder={`${questions[step].key=="workExperiences"||"educations"?`enter your ${questions[step].key}`
                                        :
                                        `Tell us about your ${questions[step].key} so we can create.`}`}
                                        autoFocus
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                            
                                `${step < questions.length - 1 ? "Next":"Generate"}`
                            )}
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}


