import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await prisma.actionItem.update({
      where: { id },
      data: {
        ...(body.task !== undefined && { task: body.task }),
        ...(body.owner !== undefined && { owner: body.owner }),
        ...(body.dueDate !== undefined && { dueDate: body.dueDate }),
        ...(body.status !== undefined && { status: body.status }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update action item" },
      { status: 500 }
    );
  }
}



export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.actionItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete action item" },
      { status: 500 }
    );
  }
}


