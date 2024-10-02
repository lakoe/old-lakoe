/*
  Warnings:

  - A unique constraint covering the columns `[midtrans_token_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "midtrans_token_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_midtrans_token_id_key" ON "invoices"("midtrans_token_id");
