/*
  Warnings:

  - The primary key for the `PhotoGalleryImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `fileName` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoGalleryImage" DROP CONSTRAINT "PhotoGalleryImage_pkey",
ADD COLUMN     "fileName" VARCHAR(255) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PhotoGalleryImage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PhotoGalleryImage_id_seq";
