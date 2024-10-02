-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_store_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "store_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
