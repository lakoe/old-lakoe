/*
  Warnings:

  - Added the required column `name` to the `carts_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts_items" ADD COLUMN     "name" TEXT NOT NULL;
