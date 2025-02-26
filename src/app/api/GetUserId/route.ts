import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export  async function GET(){
    const {userId} = await auth()
    if (!userId) {
        return NextResponse.json({error:"User not found"})
      }
    const resumes = await prisma.resume.findMany({where:{userId:userId}})
   
    return NextResponse.json(resumes)
}