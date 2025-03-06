"use server";

import groq from "@/lib/groq";
import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";

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

  console.log(systemMessage);
  console.log(userMessage);

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
  console.log(aiResponse)
  if(!aiResponse){
    throw new Error("failed to generate ai response")
  }
  
  return aiResponse
  
};
