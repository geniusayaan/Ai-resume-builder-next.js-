import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/Types";
import { workExperiencesSchema, WorkExperiencesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import GenerateWorkExperienceButton from "./GenerateWorkExperienceButton";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExperiencesValues>({
    resolver: zodResolver(workExperiencesSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch(async (values) => {
     
      setResumeData({
        ...resumeData,

        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return ()=>subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  function handleDragEnd(event:DragEndEvent){
    const {active,over} = event

    if(over && active.id !== over.id){
       const oldIndex = fields.findIndex(field=>field.id === active.id)
       const newIndex = fields.findIndex(field=>field.id===over.id)
       move(oldIndex,newIndex)
       return arrayMove(fields, oldIndex, newIndex)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-lg font-semibold">Work Experience</h2>
      </div>
      <Form {...form}>
        
        <form className="space-y-3">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext strategy={verticalListSortingStrategy} items={fields}>
          {fields.map((field, index) => (
            <WorkExperience
             id={field.id}
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          </SortableContext>
          </DndContext>
          <div className="mt-6">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorkExperienceForm;

interface WorkExperieneProps {
  id:string;
  form: UseFormReturn<WorkExperiencesValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperience = ({id, form, index, remove }: WorkExperieneProps) => {
  const {attributes,listeners,setNodeRef,transform,transition,isDragging} = useSortable({id})
  return (
    <div className="space-y-3 mb-2 border bg-background p-3" ref={setNodeRef} style={{transform:CSS.Transform.toString(transform),transition,}}>
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal className="cursor-grab"   {...attributes} {...listeners}></GripHorizontal>
      </div>

      <div className="flex justify-center">
       
            <GenerateWorkExperienceButton
             onWorkExperienceGenerated={exp=>{form.setValue(`workExperiences.${index}`,exp)
          }}/>
          
      </div>

      <div className="grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Title</FormLabel>
              <FormControl>
                <Input {...field} autoFocus></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} autoFocus></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperiences.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stnkhkjart Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" autoFocus></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperiences.${index}.endDate`}
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

      <Button variant={"destructive"} onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};
