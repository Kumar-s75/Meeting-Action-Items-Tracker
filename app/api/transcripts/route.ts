import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transcripts = await prisma.transcript.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    });

    return NextResponse.json(transcripts);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch transcripts" },
      { status: 500 }
    );
  }
}
