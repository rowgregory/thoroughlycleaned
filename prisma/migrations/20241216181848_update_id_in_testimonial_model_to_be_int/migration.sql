/*
  Warnings:

  - The primary key for the `Testimonial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Testimonial` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Testimonial_id_key";

-- AlterTable
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id");
