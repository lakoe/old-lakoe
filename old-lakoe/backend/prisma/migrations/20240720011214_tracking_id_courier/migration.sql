/*
  Warnings:

  - A unique constraint covering the columns `[tracking_id]` on the table `couriers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tracking_id` on table `couriers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "couriers" ALTER COLUMN "tracking_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "couriers_tracking_id_key" ON "couriers"("tracking_id");
