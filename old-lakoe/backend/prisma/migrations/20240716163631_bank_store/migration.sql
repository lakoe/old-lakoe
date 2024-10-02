/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `bank_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_store_id_key" ON "bank_accounts"("store_id");
