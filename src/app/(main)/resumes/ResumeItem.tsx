"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/Types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { LoaderCircle, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteResume } from "./actions";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";



interface ResumeItemProps {
  resume: ResumeServerData;
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
      <div className="space-y-3 ">
     <Link href={`/editor?resumeId=${resume.id}`}>    
     <div className="flex items-center flex-col w-full h-[4rem]"> 
          <p className="font-semibold line-clamp-1">
            {resume.title || "No title"}
          </p>

          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}

          <p className="text-xs text-muted-foreground">
            {wasUpdated?"Updated":"Created"} on{" "} {formatDate(resume.updatedAt,"MMM d, yyyy h:mm a    ")} </p>

            </div> 

            </Link>

            <Link className="inline-block relative w-full" href={`/editor?resumeId=${resume.id}`}>
         <ResumePreview className={"shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden"} resumeData={mapToResumeValues(resume)}/>
         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"/>
         </Link>

        

      </div>
      <MoreMenu resumeId={resume.id}/>
    </div>
  );
};

interface MoreMenuProps {
  resumeId:string
}

const MoreMenu = ({resumeId}:MoreMenuProps) =>{

  const [confirmationBox,setconfirmationBox] = useState(false)
  
  return (
    <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

       <Button size={"icon"} variant={"ghost"} className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100">

       <MoreVertical className="size-4"></MoreVertical>

       </Button>
           
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>setconfirmationBox(true)} className="flex cursor-pointer items-center gap-2">
         <Trash2 className="size-4"></Trash2>
         Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ConfirmationDilaoBox open={confirmationBox} onOpenChange={setconfirmationBox} resumeId={resumeId}/>
    </div>
  )

}

interface ConfirmationDilaoBoxProps{
  resumeId:string;
  open:boolean;
  onOpenChange:(open:boolean)=>void
}

const ConfirmationDilaoBox = ({resumeId,open,onOpenChange}:ConfirmationDilaoBoxProps) =>{


  const router = useRouter();

  const {toast} = useToast();

   const [isPending,startTransition] = useTransition()

   async function handleDelete() {
    try {
      await deleteResume(resumeId); 
      startTransition(() => {
        router.refresh();
      });         
      onOpenChange(false); 
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    }
    
  }
  



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>This resume will be permanently deleted.This action can not be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={
            handleDelete
           
          } variant={"destructive"}>
            {isPending?<LoaderCircle></LoaderCircle>:"Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )


}


export default ResumeItem;
