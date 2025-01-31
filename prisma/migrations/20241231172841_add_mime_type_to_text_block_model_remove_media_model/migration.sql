/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "TextBlock" ADD COLUMN     "mimeType" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Media";
