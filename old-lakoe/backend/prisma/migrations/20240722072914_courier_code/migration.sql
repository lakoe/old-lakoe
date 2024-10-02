/*
  Warnings:

  - Added the required column `courier_service_code` to the `courier_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courier_list" ADD COLUMN     "courier_service_code" TEXT NOT NULL;
