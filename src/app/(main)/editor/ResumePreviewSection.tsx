import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColorPiker from "./ColorPiker";
import BorderStyle from "./BorderStyle";
import { cn } from "@/lib/utils";

interface ResumePreviewSection {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?:string
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  className
}: ResumePreviewSection) => {
  return (
    <div className={cn("group relative  hidden md:w-1/2 w-full md:flex ",className)}>
      <div className="absolute left-1 top-5 opacity-50 lg:opacity-100 xl:opacity-100 group-hover:opacity-100 lg:left-[-10px] flex flex-col gap-3 flex-none lg:top-1 md:top-1">
        <ColorPiker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyle borderStyle={resumeData.borderStyle} onChange={(borderStyle)=>setResumeData({...resumeData,borderStyle})} />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
        contentRef={null}
          resumeData={resumeData}
          className="max-w-2xl  shadow-md"
        ></ResumePreview>
      </div>
    </div>
  );
};

export default ResumePreviewSection;
