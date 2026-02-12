import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.actionItem.update({
      where: { id: params.id },
      data: {
        task: body.task,
        owner: body.owner,
        dueDate: body.dueDate,
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update action item" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.actionItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete action item" },
      { status: 500 }
    );
  }
}

