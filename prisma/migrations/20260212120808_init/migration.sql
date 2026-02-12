-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'DONE');

-- CreateTable
CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionItem" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "owner" TEXT,
    "dueDate" TEXT,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "transcriptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActionItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActionItem" ADD CONSTRAINT "ActionItem_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
