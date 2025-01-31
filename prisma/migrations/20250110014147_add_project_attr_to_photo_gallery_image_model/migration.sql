/*
  Warnings:

  - Added the required column `project` to the `PhotoGalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoGalleryImage" ADD COLUMN     "project" VARCHAR(255) NOT NULL;
