/*
  Warnings:

  - Added the required column `fileName` to the `TextBlock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextBlock" ADD COLUMN     "fileName" VARCHAR(255) NOT NULL;
