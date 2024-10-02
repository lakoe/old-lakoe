-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_users_id_fkey";

-- DropForeignKey
ALTER TABLE "carts_items" DROP CONSTRAINT "carts_items_store_id_fkey";

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
