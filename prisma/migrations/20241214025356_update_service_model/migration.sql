/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Service` table. All the data in the column will be lost.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "isPublished",
DROP COLUMN "productName",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
