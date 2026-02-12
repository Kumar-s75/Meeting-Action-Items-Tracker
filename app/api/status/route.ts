import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

export async function GET() {
  const status = {
    backend: "ok",
    database: "unknown",
    llm: "unknown",
  };


  try {
    await prisma.$queryRaw`SELECT 1`;
    status.database = "ok";
  } catch (error) {
    status.database = "error";
  }

 
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    await openai.models.list();
    status.llm = "ok";
  } catch (error) {
    status.llm = "error";
  }

  return NextResponse.json(status);
}
