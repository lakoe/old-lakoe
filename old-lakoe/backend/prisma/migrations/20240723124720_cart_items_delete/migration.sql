-- DropForeignKey
ALTER TABLE "carts_items" DROP CONSTRAINT "carts_items_cart_id_fkey";

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
