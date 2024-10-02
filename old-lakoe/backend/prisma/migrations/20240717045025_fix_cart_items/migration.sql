/*
  Warnings:

  - A unique constraint covering the columns `[cart_id]` on the table `carts_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "carts_items_cart_id_key" ON "carts_items"("cart_id");
