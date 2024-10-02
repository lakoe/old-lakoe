-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categories_id_fkey";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
