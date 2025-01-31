/*
  Warnings:

  - You are about to drop the column `galleryItems` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "galleryItems";

-- AddForeignKey
ALTER TABLE "PhotoGalleryImage" ADD CONSTRAINT "PhotoGalleryImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
