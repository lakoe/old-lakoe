/*
  Warnings:

  - The `postal_code` column on the `location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code]` on the table `voucher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "location" ALTER COLUMN "is_main_location" SET DEFAULT true,
DROP COLUMN "postal_code",
ADD COLUMN     "postal_code" INTEGER NOT NULL DEFAULT 10160;

-- CreateIndex
CREATE UNIQUE INDEX "voucher_code_key" ON "voucher"("code");
