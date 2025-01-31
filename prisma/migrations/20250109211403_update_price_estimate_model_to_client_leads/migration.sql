/*
  Warnings:

  - You are about to drop the `PriceEstimate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PriceEstimate";

-- CreateTable
CREATE TABLE "ClientLeads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientLeads_pkey" PRIMARY KEY ("id")
);
