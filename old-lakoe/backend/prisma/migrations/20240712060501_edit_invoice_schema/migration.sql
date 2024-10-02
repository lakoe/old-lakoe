-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_confirmation_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_courier_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_invoices_histories_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_user_id_fkey";

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "confirmation_payment_id" DROP NOT NULL,
ALTER COLUMN "courier_id" DROP NOT NULL,
ALTER COLUMN "invoices_histories_id" DROP NOT NULL,
ALTER COLUMN "payment_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_confirmation_payment_id_fkey" FOREIGN KEY ("confirmation_payment_id") REFERENCES "confirmation_payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_invoices_histories_id_fkey" FOREIGN KEY ("invoices_histories_id") REFERENCES "invoice_histories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
