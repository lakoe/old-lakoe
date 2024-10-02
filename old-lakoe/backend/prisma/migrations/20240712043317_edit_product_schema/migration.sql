-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categories_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "categories_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
