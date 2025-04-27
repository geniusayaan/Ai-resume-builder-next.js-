import React, { Suspense } from "react";
import ResumeEditor from "./ResumeEditor";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/Types";

export const metadata: Metadata = {
  title: "Design your resume",
};
 
interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

const page = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({ where: { id: resumeId, userId },include:resumeDataInclude})
    : null;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <ResumeEditor resumeToEdit={resumeToEdit}/>
      </Suspense>
    </div>
  );
};

export default page;
