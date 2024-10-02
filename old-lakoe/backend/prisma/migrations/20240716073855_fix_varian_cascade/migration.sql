-- DropForeignKey
ALTER TABLE "variant_options" DROP CONSTRAINT "variant_options_variant_id_fkey";

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
