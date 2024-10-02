-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_cart_id_fkey";

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
