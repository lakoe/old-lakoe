/*
  Warnings:

  - Changed the type of `receiver_longitude` on the `invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `receiver_latitude` on the `invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "receiver_longitude",
ADD COLUMN     "receiver_longitude" INTEGER NOT NULL,
DROP COLUMN "receiver_latitude",
ADD COLUMN     "receiver_latitude" INTEGER NOT NULL;
