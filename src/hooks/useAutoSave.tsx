import { saveResume } from "@/app/(main)/editor/actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounced";
import { useToast } from "./use-toast";
import { useSearchParams } from "next/navigation";
import { ResumeValues } from "@/lib/validation";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [resumeId, setResumeId] = useState(resumeData.id);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);

  const [lastSavedData, setLastSavedData] = useState(structuredClone(resumeData));

  const debouncedResumeData = useDebounce(resumeData, 1000);

  const saveInProgress = useRef<Promise<void> | null>(null); 
  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  
  const debouncedResumeDataStr = JSON.stringify(debouncedResumeData);
  const lastSavedDataStr = JSON.stringify(lastSavedData);

  useEffect(() => {
    const hasUnSavedChanges = debouncedResumeDataStr !== lastSavedDataStr;

    if (!hasUnSavedChanges || isSavingRef.current || saveInProgress.current) {
      return;
    }

    async function save() {
      try {
        console.log("Starting save...");
        isSavingRef.current = true;
        setIsSaving(true);

        const newData = structuredClone(debouncedResumeData);
        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && { photo: undefined }),
          id: resumeId,
        });

        console.log("Updated resume:", updatedResume);
        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
        }
      } catch (error) {
        console.log("Save error:", error);
        setIsError(true);
        saveInProgress.current = null; // Reset the progress state on error
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-1.5">
              <p>Could not save changes</p>
              <Button
                variant={"secondary"}
                onClick={() => {
                  dismiss();
                  save(); // Retry
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        console.log("Ending save...");
        isSavingRef.current = false;
        setIsSaving(false);
        saveInProgress.current = null; // Ensure progress state is cleared
      }
    }

    // Track save in progress to prevent overlap
    const promise = save();
    saveInProgress.current = promise;
  }, [debouncedResumeDataStr, lastSavedDataStr, resumeId, searchParams, toast]);

  return {
    isSaving,
    hasUnSavedChanges: debouncedResumeDataStr !== lastSavedDataStr,
  };
}
