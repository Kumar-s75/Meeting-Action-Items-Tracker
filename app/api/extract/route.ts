import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: "Transcript cannot be empty" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You extract action items from meeting transcripts. Return only valid JSON. No explanation.",
        },
        {
          role: "user",
          content: `
Transcript:
"""
${transcript}
"""

Extract action items as JSON array:
[
  {
    "task": string,
    "owner": string | null,
    "due_date": string | null
  }
]
          `,
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    if (!raw) throw new Error("Empty LLM response");

    const parsed = JSON.parse(raw);

    const saved = await prisma.transcript.create({
      data: {
        content: transcript,
        items: {
          create: parsed.map((item: any) => ({
            task: item.task,
            owner: item.owner,
            dueDate: item.due_date,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(saved);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
