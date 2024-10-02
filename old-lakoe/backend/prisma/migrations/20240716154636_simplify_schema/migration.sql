/*
  Warnings:

  - You are about to drop the column `invoices_histories_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `location` table. All the data in the column will be lost.
  - You are about to drop the `_operation_hoursTostores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_storesTostores_on_decorations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `decorations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `operation_hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores_on_decorations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `users_id` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_operation_hoursTostores" DROP CONSTRAINT "_operation_hoursTostores_A_fkey";

-- DropForeignKey
ALTER TABLE "_operation_hoursTostores" DROP CONSTRAINT "_operation_hoursTostores_B_fkey";

-- DropForeignKey
ALTER TABLE "_storesTostores_on_decorations" DROP CONSTRAINT "_storesTostores_on_decorations_A_fkey";

-- DropForeignKey
ALTER TABLE "_storesTostores_on_decorations" DROP CONSTRAINT "_storesTostores_on_decorations_B_fkey";

-- DropForeignKey
ALTER TABLE "decorations" DROP CONSTRAINT "decorations_store_on_decorations_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_invoices_histories_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropIndex
DROP INDEX "invoices_invoices_histories_id_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "invoices_histories_id";

-- AlterTable
ALTER TABLE "location" DROP COLUMN "profile_id",
ADD COLUMN     "users_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_operation_hoursTostores";

-- DropTable
DROP TABLE "_storesTostores_on_decorations";

-- DropTable
DROP TABLE "decorations";

-- DropTable
DROP TABLE "invoice_histories";

-- DropTable
DROP TABLE "operation_hours";

-- DropTable
DROP TABLE "profiles";

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "stores_on_decorations";

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
