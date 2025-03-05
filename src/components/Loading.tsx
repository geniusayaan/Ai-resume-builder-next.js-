import { cn } from "@/lib/utils";
import {ButtonProps,Button} from "./ui/button"
import { Loader2 } from "lucide-react";

interface LoadingProps extends ButtonProps{
    loading:boolean;
}

const Loading = ({loading,disabled,className,...props}:LoadingProps) => {
  return (
    <Button disabled={loading||disabled} type="button" className={cn("flex items-center gap-2 ",className)}>
          {loading && <Loader2 className="size-5 animate-spin"/>}
          {props.children}
    </Button>
  )
}

export default Loading
