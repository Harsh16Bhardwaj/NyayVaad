-- CreateEnum
CREATE TYPE "LegalKnowledge" AS ENUM ('NONE', 'BASIC', 'INTERMEDIATE', 'LAWYER');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');

-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('PENDING', 'COMPLETED', 'IGNORED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "profession" TEXT,
    "legalKnowledge" "LegalKnowledge" NOT NULL,
    "jailTimeYears" INTEGER,
    "warningSeverity" TEXT,
    "pendingCaseType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'OPEN',
    "opponent" TEXT,
    "timeline" TEXT[],
    "evidence" BOOLEAN NOT NULL,
    "agreement" BOOLEAN NOT NULL,
    "impact" TEXT,
    "intent" TEXT,
    "involvedLaws" TEXT[],
    "finalAnalysis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtractedDoc" (
    "id" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "rawContent" TEXT NOT NULL,
    "aiSummary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExtractedDoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueAt" TIMESTAMP(3),
    "status" "TodoStatus" NOT NULL DEFAULT 'PENDING',
    "caseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalTerm" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "usage" TEXT[],
    "category" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LegalTerm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Case_userId_idx" ON "Case"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ExtractedDoc_docId_key" ON "ExtractedDoc"("docId");

-- CreateIndex
CREATE INDEX "ExtractedDoc_docId_idx" ON "ExtractedDoc"("docId");

-- CreateIndex
CREATE INDEX "Todo_caseId_idx" ON "Todo"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "LegalTerm_word_key" ON "LegalTerm"("word");

-- CreateIndex
CREATE INDEX "LegalTerm_word_idx" ON "LegalTerm"("word");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtractedDoc" ADD CONSTRAINT "ExtractedDoc_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
