/*
  Warnings:

  - The `receiver_postal_code` column on the `invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `postal_code` column on the `location` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "receiver_postal_code",
ADD COLUMN     "receiver_postal_code" INTEGER;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "postal_code",
ADD COLUMN     "postal_code" INTEGER NOT NULL DEFAULT 10160;
