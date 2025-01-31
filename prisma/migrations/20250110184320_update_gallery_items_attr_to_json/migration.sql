-- DropForeignKey
ALTER TABLE "PhotoGalleryImage" DROP CONSTRAINT "PhotoGalleryImage_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "galleryItems" JSONB[];
