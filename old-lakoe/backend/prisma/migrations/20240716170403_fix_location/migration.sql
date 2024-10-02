/*
  Warnings:

  - You are about to drop the column `users_id` on the `location` table. All the data in the column will be lost.
  - You are about to drop the `_locationTostores` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[store_id]` on the table `location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_id` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_locationTostores" DROP CONSTRAINT "_locationTostores_A_fkey";

-- DropForeignKey
ALTER TABLE "_locationTostores" DROP CONSTRAINT "_locationTostores_B_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_users_id_fkey";

-- AlterTable
ALTER TABLE "location" DROP COLUMN "users_id",
ADD COLUMN     "store_id" TEXT NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Monas',
ALTER COLUMN "address" SET DEFAULT 'DKI Jakarta',
ALTER COLUMN "postal_code" SET DEFAULT '10160',
ALTER COLUMN "city_district" SET DEFAULT 'Jakarta Pusat',
ALTER COLUMN "lattitude" SET DEFAULT '-6.1745517',
ALTER COLUMN "Longitude" SET DEFAULT '106.8205983',
ALTER COLUMN "is_main_location" SET DEFAULT false;

-- DropTable
DROP TABLE "_locationTostores";

-- CreateIndex
CREATE UNIQUE INDEX "location_store_id_key" ON "location"("store_id");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
