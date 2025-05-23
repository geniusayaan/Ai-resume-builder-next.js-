import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps {
    resumeData: ResumeValues;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
}

export const resumeDataInclude = {
    workExperiences: true,
    educations: true,
};

// ✅ FIXED: Infer return type from actual query method
export type ResumeServerData = Awaited<
  ReturnType<typeof prisma.resume.findUnique>
>;
