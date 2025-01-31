/*
  Warnings:

  - You are about to drop the column `project` on the `PhotoGalleryImage` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoGalleryImage" DROP COLUMN "project",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beforeImages" TEXT[],
    "afterImages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
