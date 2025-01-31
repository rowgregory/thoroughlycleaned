-- CreateTable
CREATE TABLE "PhotoGalleryImage" (
    "id" SERIAL NOT NULL,
    "photoGalleryImage" TEXT NOT NULL,
    "deleteUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoGalleryImage_pkey" PRIMARY KEY ("id")
);
