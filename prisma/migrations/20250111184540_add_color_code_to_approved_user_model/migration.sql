/*
  Warnings:

  - Added the required column `colorCode` to the `ApprovedUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApprovedUser" ADD COLUMN     "colorCode" VARCHAR(255) NOT NULL;
