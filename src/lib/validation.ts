import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValue = z.infer<typeof generalInfoSchema>;

export const personalSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "must be in image file"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "file muust be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalSchema = z.infer<typeof personalSchema>;

export const workExperiencesSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        descrption: optionalString,
      })
    )
    .optional(),
});

export type WorkExperiencesValues = z.infer<typeof workExperiencesSchema>;

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const skillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalSchema.shape,
  ...workExperiencesSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex:optionalString,
  borderStyle:optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
