/*
  Warnings:

  - You are about to drop the column `invoices_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the `_cartsTostores` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[users_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[store_id]` on the table `carts_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cart_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `users_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `carts_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `cart_id` on table `carts_items` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cart_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_cartsTostores" DROP CONSTRAINT "_cartsTostores_A_fkey";

-- DropForeignKey
ALTER TABLE "_cartsTostores" DROP CONSTRAINT "_cartsTostores_B_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_invoices_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_usersId_fkey";

-- DropForeignKey
ALTER TABLE "carts_items" DROP CONSTRAINT "carts_items_cart_id_fkey";

-- DropIndex
DROP INDEX "carts_invoices_id_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "invoices_id",
DROP COLUMN "usersId",
ADD COLUMN     "users_id" TEXT NOT NULL,
ALTER COLUMN "prices" SET DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "carts_items" ADD COLUMN     "store_id" TEXT NOT NULL,
ALTER COLUMN "cart_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "cart_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_cartsTostores";

-- CreateIndex
CREATE UNIQUE INDEX "carts_users_id_key" ON "carts"("users_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_items_store_id_key" ON "carts_items"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_cart_id_key" ON "invoices"("cart_id");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
