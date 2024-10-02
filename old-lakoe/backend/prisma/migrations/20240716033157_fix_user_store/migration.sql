/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "store_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_store_id_key" ON "users"("store_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
