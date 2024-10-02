/*
  Warnings:

  - Added the required column `product_id` to the `carts_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts_items" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
