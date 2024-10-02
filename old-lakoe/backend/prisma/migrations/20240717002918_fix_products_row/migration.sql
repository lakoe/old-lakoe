-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT false;
