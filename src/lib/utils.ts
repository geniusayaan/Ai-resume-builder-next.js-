import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { ResumeServerData } from "./Types";
import { ResumeValues } from "./validation";
import { ResumeServerData } from "./Types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: any, value: any) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data:ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    jobTitle: data.jobTitle || undefined,

    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    email: data.email || undefined,
    phone: data.phone || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      description: exp.description || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
    })),
    educations: data.educations.map((edu) => ({
      school: edu.school || undefined,
      degree: edu.degree || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    skills: data.skills,
    summary: data.summary || undefined,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
  };
}
