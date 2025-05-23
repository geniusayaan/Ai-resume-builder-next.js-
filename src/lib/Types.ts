import prisma from "@/lib/prisma"; // ✅ REAL client instance
import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
};

// ✅ Fully correct usage
export type ResumeServerData = Awaited<
  ReturnType<typeof prisma.resume.findUnique>
>;
