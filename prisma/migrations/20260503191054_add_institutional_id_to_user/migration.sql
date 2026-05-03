/*
  Warnings:

  - A unique constraint covering the columns `[institutionalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institutionalId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "institutionalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_institutionalId_key" ON "User"("institutionalId");
