-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "variant_options" DROP CONSTRAINT "variant_options_variant_option_id_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_variant_option_id_fkey";

-- AlterTable
ALTER TABLE "variant_option_values" ADD COLUMN     "img" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_option_id_fkey" FOREIGN KEY ("variant_option_id") REFERENCES "variant_option_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_variant_option_id_fkey" FOREIGN KEY ("variant_option_id") REFERENCES "variant_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
