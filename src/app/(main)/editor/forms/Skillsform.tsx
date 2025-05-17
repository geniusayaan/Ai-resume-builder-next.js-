import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { EditorFormProps } from "@/lib/Types"
import { skillSchema, SkillsValues } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

const Skillsform = ({resumeData,setResumeData}:EditorFormProps) => {

    const form = useForm<SkillsValues>({
        resolver:zodResolver(skillSchema),
        defaultValues:{
            skills:resumeData.skills||[]
        }
    })

     useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
          
          setResumeData({...resumeData,skills:values.skills?.filter(skill => skill!==undefined).map(skill=>skill.trim()).filter(skill=>skill!=="")})
        });
        return unsubscribe;
      }, [form,resumeData,setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
    <div className="space-y-1.5 text-center">
      <h2 className="text-lg font-semibold">Skills</h2>
    </div>

    <Form {...form}>
        <form>
            <FormField control={form.control} name="skills" render={({field})=>(
                <FormItem>
                    <FormLabel className="sr-only">Skills</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="e.g. React.js,Node.js,Prisma" onChange={(e)=>{
                            const skills = e.target.value.split(",");
                            field.onChange(skills)
                        }}/>
                    </FormControl>
                    <FormDescription className="text-muted-foreground">Separate each skill with comma.</FormDescription>
                
                </FormItem>
            )}/>
        </form>
    </Form>
   
  </div>    
);
}

export default Skillsform

