/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ApprovedUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ApprovedUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApprovedUser" ADD COLUMN     "userId" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ApprovedUser_userId_key" ON "ApprovedUser"("userId");

-- AddForeignKey
ALTER TABLE "ApprovedUser" ADD CONSTRAINT "ApprovedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
