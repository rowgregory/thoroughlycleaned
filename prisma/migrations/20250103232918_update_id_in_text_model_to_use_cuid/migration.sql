/*
  Warnings:

  - The primary key for the `TextBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TextBlock" DROP CONSTRAINT "TextBlock_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TextBlock_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TextBlock_id_seq";
