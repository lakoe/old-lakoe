/*
  Warnings:

  - You are about to drop the column `invoices_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `midtrans_transaction_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[midtrans_order_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_invoices_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_fkey";

-- DropIndex
DROP INDEX "payments_invoices_id_key";

-- DropIndex
DROP INDEX "payments_midtrans_transaction_id_key";

-- DropIndex
DROP INDEX "payments_user_id_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "invoices_id",
DROP COLUMN "midtrans_transaction_id",
DROP COLUMN "user_id",
ADD COLUMN     "midtrans_order_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_midtrans_order_id_key" ON "payments"("midtrans_order_id");
