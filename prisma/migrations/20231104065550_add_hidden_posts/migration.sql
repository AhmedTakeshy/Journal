-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hiddenPosts" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
