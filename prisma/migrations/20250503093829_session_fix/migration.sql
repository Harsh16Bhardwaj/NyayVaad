/*
  Warnings:

  - You are about to drop the `EnhancedLaw` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnhancedLaw" DROP CONSTRAINT "EnhancedLaw_caseId_fkey";

-- DropTable
DROP TABLE "EnhancedLaw";

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_caseId_key" ON "Session"("caseId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
