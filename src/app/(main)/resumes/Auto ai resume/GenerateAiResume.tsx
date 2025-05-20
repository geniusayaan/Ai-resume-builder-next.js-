import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast';
import { resumeSchema, ResumeValues } from '@/lib/validation';
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
    <Button className='space-y-1 w-[7rem] h-[1.5rem] sm:h-[2rem] sm:w-[9rem]
    md:h-[2rem] md:w-[8rem] lg:h-[3rem] lg:w-[9rem] xl:h-[3rem] xl:w-[10rem] hover:bg-purple-900 bg-purple-950 text-white' onClick={()=>setShowInputDilog(true)}>{pathname==="/editor"?"Upgrade with AI":"Generate"}</Button>
    
   <InputDialog onResumeDataGenerated={(resumeData=>{
    onResumeDataGenerated(resumeData)
       setShowInputDilog(false)
   })} open={showInputDialog} onOpenChange={setShowInputDilog}/>
   </>
  )
}

export default GenerateAiResume

interface InputDialogProps {
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    onResumeDataGenerated:(resumeData:ResumeValues)=>void;
}



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

    const onSubmit = async (data: ResumeValues) => {
        try {
            const response = await GenerateResumeData(data);
            onResumeDataGenerated(response);
            onOpenChange(false);  
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="E.g. 'From Nov 2019 to Dec 2020, I worked at Google as a software engineer. Tasks included...'"
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
                                "Generate"
                            )}
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}


