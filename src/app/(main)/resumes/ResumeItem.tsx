"use client";

import ResumePreview from "@/components/ResumePreview";
import { ResumeServerData } from "@/lib/Types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";

interface ResumeItemProps {
  resume: ResumeServerData;
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
      <div className="space-y-3 ">
        <Link
          className="inline-block w-full text-center"
          href={`/editor?resumeId=${resume.id}`}
        >
          <p className="font-semibold line-clamp-1">
            {resume.title || "No title"}
          </p>

          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}

          <p className="text-xs text-muted-foreground">
            {wasUpdated?"Updated":"Created"} on{" "} {formatDate(resume.updatedAt,"MMM d, yyyy h:mm a    ")} </p>

        </Link>

        <Link className="inline-block"
          href={`/editor?resumeId=${resume.id}`}>
         <ResumePreview className={"shadow-sm group-hover:shadow-lg transition-shadow"} resumeData={mapToResumeValues(resume)}/>
        </Link>

      </div>
    </div>
  );
};

export default ResumeItem;
