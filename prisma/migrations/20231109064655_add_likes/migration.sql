-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shares" INTEGER NOT NULL DEFAULT 0;
