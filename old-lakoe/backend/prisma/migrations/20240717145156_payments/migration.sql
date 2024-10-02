/*
  Warnings:

  - You are about to drop the `confirmation_payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "confirmation_payment" DROP CONSTRAINT "confirmation_payment_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_invoices_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_fkey";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "invoices_id" DROP NOT NULL;

-- DropTable
DROP TABLE "confirmation_payment";

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoices_id_fkey" FOREIGN KEY ("invoices_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
