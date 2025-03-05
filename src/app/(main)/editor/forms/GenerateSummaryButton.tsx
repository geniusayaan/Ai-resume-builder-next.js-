import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { GenerateSummary } from "./actions";
import { cn } from "@/lib/utils";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default  function GenerateSummaryButton({
  onSummaryGenerated,
  resumeData,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleClick = async(e:any) => {
    e.preventDefault()
    try {
        setLoading(true)
        const aiResponse = await GenerateSummary(resumeData)
        onSummaryGenerated(aiResponse)
    } catch (error) {
        toast({
                variant:"destructive",
                description:"something went wrong"
        })
    }finally{
        setLoading(false)
    }
  };

  return (
      

      <WandSparklesIcon   type="button" className={"px-2 p-1 rounded-md size-10 cursor-pointer border "} onClick={handleClick} aria-disabled={false}>Generate (AI)</WandSparklesIcon>
      
   
  );
}
