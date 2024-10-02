/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "store_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_store_id_key" ON "invoices"("store_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
