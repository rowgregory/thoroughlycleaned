/*
  Warnings:

  - You are about to drop the `Adriana2FA` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Adriana2FA";

-- CreateTable
CREATE TABLE "TwoFactorAuth" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorAuth_pkey" PRIMARY KEY ("id")
);
