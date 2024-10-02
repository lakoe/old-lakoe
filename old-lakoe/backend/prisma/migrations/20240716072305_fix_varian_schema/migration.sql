/*
  Warnings:

  - You are about to drop the column `variant_option_id` on the `variant_options` table. All the data in the column will be lost.
  - You are about to drop the column `variant_option_id` on the `variants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[variant_option_id]` on the table `variant_option_values` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variant_id]` on the table `variant_options` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variant_option_id` to the `variant_option_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_id` to the `variant_options` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "variant_options" DROP CONSTRAINT "variant_options_variant_option_id_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_variant_option_id_fkey";

-- AlterTable
ALTER TABLE "variant_option_values" ADD COLUMN     "variant_option_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "variant_options" DROP COLUMN "variant_option_id",
ADD COLUMN     "variant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "variant_option_id";

-- CreateIndex
CREATE UNIQUE INDEX "variant_option_values_variant_option_id_key" ON "variant_option_values"("variant_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_options_variant_id_key" ON "variant_options"("variant_id");

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_option_values" ADD CONSTRAINT "variant_option_values_variant_option_id_fkey" FOREIGN KEY ("variant_option_id") REFERENCES "variant_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
