import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"

import { Metadata } from "next"
import Link from "next/link"

export const metadata:Metadata = {
    title:"Your resumes"
}

export default function page(){
    return(
        <main>
        <div className="w-full flex px-4 p-2 space-y-1.5 mt-4 justify-center">
            <Button asChild className="w-[200px]  h-[42px]">
                <Link href={"/editor"}>
              <PlusCircleIcon/>
                Add a resume
                </Link>
            </Button>
        </div>
        </main>
    )
}