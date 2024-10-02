/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `discounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");
