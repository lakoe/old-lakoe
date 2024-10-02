/*
  Warnings:

  - You are about to drop the column `confirmation_payment_id` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoice_id]` on the table `confirmation_payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_id` to the `confirmation_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_confirmation_payment_id_fkey";

-- DropIndex
DROP INDEX "invoices_confirmation_payment_id_key";

-- AlterTable
ALTER TABLE "confirmation_payment" ADD COLUMN     "invoice_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "confirmation_payment_id";

-- CreateIndex
CREATE UNIQUE INDEX "confirmation_payment_invoice_id_key" ON "confirmation_payment"("invoice_id");

-- AddForeignKey
ALTER TABLE "confirmation_payment" ADD CONSTRAINT "confirmation_payment_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
