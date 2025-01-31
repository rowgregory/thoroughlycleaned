/*
  Warnings:

  - You are about to drop the `ClientLeads` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageRole` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoGalleryImage" ADD COLUMN     "imageRole" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "ClientLeads";

-- CreateTable
CREATE TABLE "ClientLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientLead_pkey" PRIMARY KEY ("id")
);
