import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Education, GenerateEducationInput, generateEducationSchema, generateWorkExpereinceSchema, GenerateWorkExperinceInput, ResumeValues, WorkExperience } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import {  GenerateEducation, GenerateWorkExperience } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";


interface GenerateEducationButtonProps {
    onEducationGenerated: (education: Education) => void;
}

export default  function GenerateEducationButton({
    onEducationGenerated,
}: GenerateEducationButtonProps) {
 
    const [showInputDialog,setShowInputDilog]  = useState(false)

  return (
      <>
    
    
  <WandSparklesIcon onClick={()=>setShowInputDilog(true)}   type="button" className={"px-2 p-1 rounded-md size-10 cursor-pointer border "} >Smart fill (AI)</WandSparklesIcon>
    

    <InputDialog open={showInputDialog} onEducationGenerated={(Experience)=>{
       onEducationGenerated(Experience)
       setShowInputDilog(false)
    }} onOpenChange={setShowInputDilog}/>
    </>
  );
}

interface InputDialogProps {
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    onEducationGenerated: (education: Education) => void;
}

function InputDialog({open,onOpenChange,onEducationGenerated}:InputDialogProps){
    const {toast} = useToast()

    const [loading,setLoading] = useState(false)

    const form = useForm<GenerateEducationInput>({
        resolver:zodResolver(generateEducationSchema),
        defaultValues:{
            description:""
        }
    })

    const onSubmit = async(input:GenerateEducationInput) =>{
        try {

            const response = await GenerateEducation(input)
            onEducationGenerated(response)
        } catch (error) {
            console.log(error)
            toast({
                variant:"destructive",
                description:"something went wrong"
        })
        }
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent>
    <DialogHeader>
        <DialogTitle>Generate Education</DialogTitle>
        <DialogDescription>Describe this school and degree. The Ai will generate an optimized entry for you.</DialogDescription>
    </DialogHeader>
    <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="description" render={({field})=>(
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder={`E.g. "from nov 2019 to dec 2020 i worked at Google as a software engineer,tasks were: ...."`} autoFocus></Textarea>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
            )}/>
            <Button type="submit">
              {
                form.formState.isSubmitting?<span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>:"Generate"
              }
            </Button>
        </form>
    </Form>
</DialogContent>
        </Dialog>
    )


} 