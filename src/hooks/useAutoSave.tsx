import { ResumeValues } from "@/lib/validation";
import useDebounce from "./useDebounced";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast, useToast } from "./use-toast";
import { saveResume } from "@/app/(main)/editor/actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const [resumeId, setResumeId] = useState(resumeData.id);
  const [isError, setIserror] = useState(false);

  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData)
  );

  const [isSaving, setisSaving] = useState(false);

  useEffect(() => {
    setIserror(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setisSaving(true);
        setIserror(false);
        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo,fileReplacer) === JSON.stringify(newData.photo,fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);

        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIserror(true);
        console.log(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-1.5">
              <p>Could not save changes</p>
              <Button
                variant={"secondary"}
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setisSaving(false);
      }
    }

    const hasUnSavedChanges =
      JSON.stringify(debouncedResumeData,fileReplacer) !== JSON.stringify(lastSavedData,fileReplacer);

    if (hasUnSavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [debouncedResumeData, isSaving, lastSavedData,isError,toast,resumeId,searchParams]);

  return {
    isSaving,
    hasUnSavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
