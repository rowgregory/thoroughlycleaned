/*
  Warnings:

  - You are about to drop the column `image` on the `Service` table. All the data in the column will be lost.
  - You are about to alter the column `serviceType` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `fileName` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "image",
ADD COLUMN     "fileName" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "serviceType" SET DATA TYPE VARCHAR(255);
