/*
  Warnings:

  - You are about to drop the column `deleteUrl` on the `PhotoGalleryImage` table. All the data in the column will be lost.
  - You are about to drop the column `photoGalleryImage` on the `PhotoGalleryImage` table. All the data in the column will be lost.
  - Added the required column `url` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoGalleryImage" DROP COLUMN "deleteUrl",
DROP COLUMN "photoGalleryImage",
ADD COLUMN     "url" TEXT NOT NULL;
