/*
  Warnings:

  - You are about to drop the `_productsTostores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `store_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_productsTostores" DROP CONSTRAINT "_productsTostores_A_fkey";

-- DropForeignKey
ALTER TABLE "_productsTostores" DROP CONSTRAINT "_productsTostores_B_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "store_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_productsTostores";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
