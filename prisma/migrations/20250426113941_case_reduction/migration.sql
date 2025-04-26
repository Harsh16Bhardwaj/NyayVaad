/*
  Warnings:

  - You are about to drop the column `impact` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `intent` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "impact",
DROP COLUMN "intent";
