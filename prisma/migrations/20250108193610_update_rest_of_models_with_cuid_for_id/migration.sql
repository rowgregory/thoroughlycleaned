/*
  Warnings:

  - The primary key for the `PriceEstimate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Testimonial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TwoFactorAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "PriceEstimate" DROP CONSTRAINT "PriceEstimate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PriceEstimate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PriceEstimate_id_seq";

-- AlterTable
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Testimonial_id_seq";

-- AlterTable
ALTER TABLE "TwoFactorAuth" DROP CONSTRAINT "TwoFactorAuth_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TwoFactorAuth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TwoFactorAuth_id_seq";

-- DropTable
DROP TABLE "Visit";
