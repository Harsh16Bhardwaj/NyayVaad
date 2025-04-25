/*
  Warnings:

  - You are about to drop the column `involvedLaws` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "involvedLaws";

-- CreateTable
CREATE TABLE "EnhancedLaw" (
    "id" TEXT NOT NULL,
    "law" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "relevance" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnhancedLaw_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnhancedLaw" ADD CONSTRAINT "EnhancedLaw_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
