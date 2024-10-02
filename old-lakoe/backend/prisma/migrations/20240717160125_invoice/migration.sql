-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'DIBATALKAN';

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "status" SET DEFAULT 'BELUM_DIBAYAR';
