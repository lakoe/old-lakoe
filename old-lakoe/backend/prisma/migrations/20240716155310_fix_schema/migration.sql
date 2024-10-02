/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "courier" TEXT[] DEFAULT ARRAY['grab', 'jne', 'tiki', 'gojek']::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
