"use server";

import groq from "@/lib/groq";
import {
  Education,
  GenerateEducationInput,
  generateEducationSchema,
  GenerateResumeInput,
  generateResumeSchema,
  GenerateSummaryInput,
  generateSummarySchema,
  generateWorkExpereinceSchema,
  GenerateWorkExperinceInput,
  ResumeValues,
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

  const systemMessage = `You are an ai resume generator.Your task is to generate a single work experience enrty according to the user input.Your response should/must adhere the following structure.You can omit fields if they can't be infered from the provided data,but don't  add any ones.
  
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


export const GenerateEducation = async (input:GenerateEducationInput) =>{
  
  const {description} = generateEducationSchema.parse(input)

  const systemMessage = `You are an ai resume generator.Your task is to generate a single Education enrty according to the user input.Your response should/must adhere the following structure.You can omit fields if they can't be infered from the provided data,but don't  add any ones.
  
  School:<School>
  Degree:<Degree name>
  Start date:<format:MM-DD-YYYY>(only if provided)
  End date:<format:MM-DD-YYYY>(only if provided)
  `

  const userMessage = ` Please provide a education entry from this description:${description}`

  
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

  const formatDate = (date: string | undefined): string | undefined => {
    if (!date) 
      return undefined; 

    const match = date.match(/(\d{2})-(\d{2})-(\d{4})/); 
    if (!match) return undefined;
    const [_, month, day, year] = match;
    return `${year}-${month}-${day}`; 
  };
    return {
      school: aiResponse.match(/School:\s*(.*)/)?.[1] || "",
      degree: aiResponse.match(/Degree:\s*(.*)/)?.[1] || "",
      startDate: formatDate(aiResponse.match(/Start date:\s*(\d{2}-\d{2}-\d{4})/)?.[1]),
      endDate: formatDate(aiResponse.match(/End date:\s*(\d{2}-\d{2}-\d{4})/)?.[1])
    } satisfies Education

}

export const GenerateResumeData = async (input: string) => {
    const  description  = input;

    const systemMessage = `You are an AI-powered resume builder designed to assist users in creating professional, tailored resumes. Your task is to interact with users through a series of questions to gather necessary information and then generate a comprehensive resume based on their input. Give it in the following strict order without any extra text:

    Title: <ResumeTitle> (only if provided),
    Description: <Description about resume> (only if provided),

    FirstName: <users firstname> (only if provided),
    LastName: <users LastName> (only if provided),
    JobTitle: <users JobTitle> (only if provided),
    City: <users City> (only if provided),
    Country: <users Country> (only if provided),
    Phone: <users Phone> (only if provided),
    Email: <users Email> (only if provided),

    workExperiences:
      - position: optionalString
        company: optionalString
        startDate: optionalString
        endDate: optionalString
        description: optionalString(if not provided bases on the work create it)
    (array format if more than one)

    educations:
      - degree: optionalString
        school: optionalString
        startDate: optionalString
        endDate: optionalString
    (array format if more than one)

    Skills: [string, string, ...] (skills),

    Summary: (Accoding to the deatails like work experices and other skills and thers thing the user said in other combine them and create a proffesional profile (summary)),

    If anything is not provided by the user, leave it as an empty string or empty array.
    and if you think it is a spelling mistake then coorect that only spelling
    `;

    const userMessage = `Please provide a resume entry from this data: ${description}`;

    const response = await groq.chat.completions.create({
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
        ],
        model: "llama-3.3-70b-versatile",
    });

    const aiResponse = response.choices[0].message.content;
    if (!aiResponse) {
        throw new Error("Failed to generate AI response");
    }

    const extractField = (label: string) => aiResponse.match(new RegExp(`${label}:\s*(.*)`))?.[1]?.trim() || "";

    const firstName = extractField("FirstName");
    const lastName = extractField("LastName");
    const jobTitle = extractField("JobTitle");
    const city = extractField("City");
    const country = extractField("Country");
    const phone = extractField("Phone");
    const email = extractField("Email");
    const summary = extractField("Summary");

const rawWorkMatches = Array.from(aiResponse.matchAll(
  /- position: (.*)\n\s*company: (.*)\n\s*startDate: (.*)\n\s*endDate: (.*)\n\s*description: (.*)/g
));

const workExperiences = rawWorkMatches.length
  ? rawWorkMatches.map(match => ({
      position: match[1]?.trim() || "",
      company: match[2]?.trim() || "",
      startDate: match[3]?.trim() || "",
      endDate: match[4]?.trim() || "",
      description: match[5]?.trim() || "",
    }))
  : undefined;

  const rawEduMatches = Array.from(aiResponse.matchAll(
  /- degree: (.*)\n\s*school: (.*)\n\s*startDate: (.*)\n\s*endDate: (.*)/g
));

const educations = rawEduMatches.length
  ? rawEduMatches.map(match => ({
      degree: match[1]?.trim() || "",
      school: match[2]?.trim() || "",
      startDate: match[3]?.trim() || "",
      endDate: match[4]?.trim() || "",
    }))
  : undefined;


    const skillsMatch = aiResponse.match(/Skills:\s*\[(.*)\]/);
    const skills = skillsMatch ? skillsMatch[1].split(',').map(skill => skill.trim()).filter(Boolean) : [];

    return {
        firstName,
        lastName,
        jobTitle,
        city,
        country,
        phone,
        email,
        workExperiences,
        educations,
        skills,
        summary,
    } satisfies ResumeValues;
};
