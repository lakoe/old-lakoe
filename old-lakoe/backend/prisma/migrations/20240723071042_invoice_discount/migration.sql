/*
  Warnings:

  - You are about to drop the column `cart_id` on the `discounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_cart_id_fkey";

-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "cart_id";

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "discount_id" TEXT;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
