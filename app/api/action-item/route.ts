import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { transcriptId, task, owner, dueDate } =
      await req.json();

    if (!transcriptId || !task) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newItem = await prisma.actionItem.create({
      data: {
        transcriptId,
        task,
        owner,
        dueDate,
      },
    });

    return NextResponse.json(newItem);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create action item" },
      { status: 500 }
    );
  }
}
