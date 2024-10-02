-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "bank" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "midtrans_transaction_id" DROP NOT NULL;
