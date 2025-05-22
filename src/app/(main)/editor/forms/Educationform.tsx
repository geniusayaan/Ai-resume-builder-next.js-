import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,


  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/Types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import GenerateEducationButton from "./GenerateEducatioButton";

const Educationform = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
    
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      
      setResumeData({
        ...resumeData,

        educations: values.educations?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-lg font-semibold">Education</h2>
      </div>



      <Form {...form}>
        <form className="spce-y-3">
          {fields.map((field, index) => (
            <EducationItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <div className="mt-6">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Educationform;

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ index, form, remove }: EducationItemProps) => {
  return (
    <div className="space-y-3 mb-2 border bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
      </div>

      <div className="flex justify-center">
       
            <GenerateEducationButton
             onEducationGenerated={edu=>{form.setValue(`educations.${index}`,edu)
          }}/>
          
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degreee</FormLabel>
            <FormControl>
              <Input {...field} autoFocus></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} autoFocus></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" autoFocus></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button variant={"destructive"} onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};
