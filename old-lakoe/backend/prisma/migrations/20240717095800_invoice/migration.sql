/*
  Warnings:

  - You are about to drop the column `payment_id` on the `invoices` table. All the data in the column will be lost.
  - The `status` column on the `invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `moota_transaction_id` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[midtrans_transaction_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `midtrans_transaction_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PESANAN_BARU', 'BELUM_DIBAYAR', 'SIAP_DIKIRIM', 'DALAM_PENGIRIMAN', 'PESANAN_SELESAI');

-- DropIndex
DROP INDEX "payments_moota_transaction_id_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "payment_id",
DROP COLUMN "status",
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'PESANAN_BARU',
ALTER COLUMN "invoice_number" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "moota_transaction_id",
ADD COLUMN     "midtrans_transaction_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_midtrans_transaction_id_key" ON "payments"("midtrans_transaction_id");
