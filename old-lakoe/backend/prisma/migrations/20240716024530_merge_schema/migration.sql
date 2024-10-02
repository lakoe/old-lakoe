/*
  Warnings:

  - You are about to drop the column `name` on the `carts_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carts_items" DROP COLUMN "name",
ALTER COLUMN "quantity" SET DATA TYPE TEXT;
