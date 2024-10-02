/*
  Warnings:

  - You are about to drop the column `invoices_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `confirmation_payment_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `courier_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `invoices_histories_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `invoices_id` on the `payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_invoices_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_confirmation_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_courier_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_invoices_histories_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_user_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_invoices_id_fkey";

-- DropIndex
DROP INDEX "carts_invoices_id_key";

-- DropIndex
DROP INDEX "invoices_confirmation_payment_id_key";

-- DropIndex
DROP INDEX "invoices_courier_id_key";

-- DropIndex
DROP INDEX "invoices_invoices_histories_id_key";

-- DropIndex
DROP INDEX "payments_invoices_id_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "invoices_id";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "confirmation_payment_id",
DROP COLUMN "courier_id",
DROP COLUMN "invoices_histories_id",
DROP COLUMN "payment_id",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "invoices_id";
