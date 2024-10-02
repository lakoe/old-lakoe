/*
  Warnings:

  - Added the required column `chosen_courier` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chosen_service` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_store_id_fkey";

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "chosen_courier" TEXT NOT NULL,
ADD COLUMN     "chosen_service" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
