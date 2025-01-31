-- DropForeignKey
ALTER TABLE "ApprovedUser" DROP CONSTRAINT "ApprovedUser_userId_fkey";

-- AlterTable
ALTER TABLE "ApprovedUser" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ApprovedUser" ADD CONSTRAINT "ApprovedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
