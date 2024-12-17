/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `TwoFactorAuth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `TwoFactorAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TwoFactorAuth" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuth_phoneNumber_key" ON "TwoFactorAuth"("phoneNumber");
