/*
  Warnings:

  - Added the required column `fileName` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "fileName" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
