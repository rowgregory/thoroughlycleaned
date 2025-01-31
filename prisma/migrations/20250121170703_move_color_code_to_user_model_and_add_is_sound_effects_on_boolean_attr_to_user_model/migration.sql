/*
  Warnings:

  - You are about to drop the column `colorCode` on the `ApprovedUser` table. All the data in the column will be lost.
  - Added the required column `colorCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApprovedUser" DROP COLUMN "colorCode";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "colorCode" VARCHAR(255) NOT NULL,
ADD COLUMN     "isSoundEffectsOn" BOOLEAN NOT NULL DEFAULT true;
