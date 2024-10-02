/*
  Warnings:

  - A unique constraint covering the columns `[invoices_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courier_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[confirmation_payment_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoices_histories_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoices_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoices_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmation_payment_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoices_histories_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoices_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Made the column `categories_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categories_id_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "invoices_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "confirmation_payment_id" TEXT NOT NULL,
ADD COLUMN     "courier_id" TEXT NOT NULL,
ADD COLUMN     "invoices_histories_id" TEXT NOT NULL,
ADD COLUMN     "payment_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "invoices_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "categories_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "carts_invoices_id_key" ON "carts"("invoices_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_courier_id_key" ON "invoices"("courier_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_confirmation_payment_id_key" ON "invoices"("confirmation_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoices_histories_id_key" ON "invoices"("invoices_histories_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_invoices_id_key" ON "payments"("invoices_id");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_invoices_id_fkey" FOREIGN KEY ("invoices_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_confirmation_payment_id_fkey" FOREIGN KEY ("confirmation_payment_id") REFERENCES "confirmation_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_invoices_histories_id_fkey" FOREIGN KEY ("invoices_histories_id") REFERENCES "invoice_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoices_id_fkey" FOREIGN KEY ("invoices_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
