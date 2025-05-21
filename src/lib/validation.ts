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
        description: optionalString,
      })
    )
    .optional(),
});

export type WorkExperiencesValues = z.infer<typeof workExperiencesSchema>;

export type WorkExperience = NonNullable<z.infer<typeof workExperiencesSchema>["workExperiences"]>[number]




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

export type Education = NonNullable<z.infer<typeof educationSchema>["educations"]>[number]

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
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExpereinceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "First tell us about your works")
    .min(20, "Charecters must be at least 20 charecters long"),
});

export type GenerateWorkExperinceInput = z.infer<
  typeof generateWorkExpereinceSchema
>;

export const generateEducationSchema = z.object({
  description:z.string().trim().min(1,"First tell about your education").min(20, "Charecters must be at least 20 charecters long"),
})

export type GenerateEducationInput = z.infer<typeof generateEducationSchema>

export const generateResumeSchema = z.object({
  description:z.string().trim().min(1,"First tell about your resume").min(10, "Charecters must be at least 5 charecters long"),
})

export type GenerateResumeInput = z.infer<typeof generateResumeSchema>

export const generateSummarySchema = z.object({
  jobtitle: optionalString,
  ...workExperiencesSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;
