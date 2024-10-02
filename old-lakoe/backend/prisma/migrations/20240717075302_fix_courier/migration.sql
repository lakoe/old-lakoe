/*
  Warnings:

  - You are about to drop the column `courier_service_code` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `chosen_courier` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `chosen_service` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `courier_id` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoice_id]` on the table `couriers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_id` to the `couriers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_courier_id_fkey";

-- DropIndex
DROP INDEX "couriers_order_id_key";

-- DropIndex
DROP INDEX "invoices_courier_id_key";

-- AlterTable
ALTER TABLE "couriers" DROP COLUMN "courier_service_code",
DROP COLUMN "order_id",
ADD COLUMN     "invoice_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "chosen_courier",
DROP COLUMN "chosen_service",
DROP COLUMN "courier_id";

-- CreateIndex
CREATE UNIQUE INDEX "couriers_invoice_id_key" ON "couriers"("invoice_id");

-- AddForeignKey
ALTER TABLE "couriers" ADD CONSTRAINT "couriers_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
