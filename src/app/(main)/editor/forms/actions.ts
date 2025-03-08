"use server";

import groq from "@/lib/groq";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  generateWorkExpereinceSchema,
  GenerateWorkExperinceInput,
  WorkExperience,
} from "@/lib/validation";

export const GenerateSummary = async (input: GenerateSummaryInput) => {
  const { jobtitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are an AI generator for resume.Your job is to make a proffesional introduction summary on a resume by the data given by the user.You have to keep that proffesional and longer.Remember that you do not have to return  other things in the response eg:here it is or like results-driven. you have to give only the portion of the summary in response`;

  const userMessage = `Here is the users data:
        Job title:${jobtitle || "N/A"},
        work experiences:${workExperiences?.map(
          (exp) =>
            `
       Position:${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "N/A"}

       Description:${exp.description || "N/A"}

            `
        )},
        educations:${educations?.map(
          (edu) =>
            `
         work:${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
  
              `
        )},
          Skills:${skills}`;


  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const aiResponse = completion.choices[0].message.content;
  console.log(aiResponse);
  if (!aiResponse) {
    throw new Error("failed to generate ai response");
  }

  return aiResponse;
};

export const GenerateWorkExperience = async (
  input: GenerateWorkExperinceInput
) => {

  const {description} = generateWorkExpereinceSchema.parse(input)

  const systemMessage = `You are an ai resume generator.Your task is to generate a single work experience enrty according to the user input.Your response should/must adhere the following structure.You can omit fields if they can't be infered from the provided data,but don't any add ones.
  
  Job title:<job title>
  Company:<company name>
  Start date:<format:MM-DD-YYYY>(only if provided)
  End date:<format:MM-DD-YYYY>(only if provided)
  Description:<an optimized description in bullet format,might be infered from the job title>
  `

  const userMessage = ` Please provide a work experience entry from this description:${description}`

  
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const aiResponse = completion.choices[0].message.content;
  // console.log(aiResponse);
  if (!aiResponse) {
    throw new Error("failed to generate ai response");
  }
console.log(aiResponse)
const formatDate = (date: string | undefined): string | undefined => {
  if (!date) 
    return undefined; // Handle missing dates


  const match = date.match(/(\d{2})-(\d{2})-(\d{4})/); // MM-DD-YYYY format
  if (!match) return undefined;
  const [_, month, day, year] = match; // Correct order
  return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
  

      
};
  return {
    

    position: aiResponse.match(/Job title:\s*(.*)/)?.[1] || "",
    company: aiResponse.match(/Company:\s*(.*)/)?.[1] || "",
    startDate: formatDate(aiResponse.match(/Start date:\s*(\d{2}-\d{2}-\d{4})/)?.[1]),
    endDate: formatDate(aiResponse.match(/End date:\s*(\d{2}-\d{2}-\d{4})/)?.[1]),
    description: (aiResponse.match(/Description:\s*([\s\S]*)/)?.[1] || "").trim()
  } satisfies WorkExperience

};
