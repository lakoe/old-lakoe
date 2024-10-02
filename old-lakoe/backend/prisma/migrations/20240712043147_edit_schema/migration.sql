/*
  Warnings:

  - Made the column `user_id` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_user_id_fkey";

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
