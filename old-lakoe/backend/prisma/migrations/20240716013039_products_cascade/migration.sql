-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_product_id_fkey";

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
