import { generalInfoSchema, GeneralInfoValue } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { EditorFormProps } from "@/lib/Types";

const GeneralInform = ({resumeData,setResumeData}:EditorFormProps) => {
  const form = useForm<GeneralInfoValue>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title:resumeData.title || "",
      description: resumeData.description||"",
    },
  });


  useEffect(() => {
      const { unsubscribe } = form.watch(async (values) => {
        setResumeData({...resumeData,...values})
      });
      return unsubscribe;
    }, [form,resumeData,setResumeData]);


  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-xl font-semibold">General Info</h2>
      </div>
      <Form {...form}>
        <form className="space-y-1.5">
          <div className="flex flex-col gap-12">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Resume name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My cool Resume" />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Resume for my Fantastic job" />
                </FormControl>
                <FormDescription className="select-none">
                  Describe what this resume is for
                </FormDescription>
              </FormItem>
            )}
          ></FormField>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralInform;
