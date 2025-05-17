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

export type ResumeServerData = Prisma.ResumeGetPayload<{
    include: typeof resumeDataInclude;
}>;
