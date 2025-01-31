/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `ApprovedUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApprovedUser_phoneNumber_key" ON "ApprovedUser"("phoneNumber");
