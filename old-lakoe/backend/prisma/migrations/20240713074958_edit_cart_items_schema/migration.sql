/*
  Warnings:

  - You are about to drop the column `city` on the `carts_items` table. All the data in the column will be lost.
  - Added the required column `name` to the `carts_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `carts_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts_items" DROP CONSTRAINT "carts_items_cart_id_fkey";

-- AlterTable
ALTER TABLE "carts_items" DROP COLUMN "city",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL,
ALTER COLUMN "cart_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
