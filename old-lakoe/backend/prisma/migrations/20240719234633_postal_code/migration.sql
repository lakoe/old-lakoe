-- DropIndex
DROP INDEX "location_store_id_key";

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "receiver_postal_code" TEXT;
