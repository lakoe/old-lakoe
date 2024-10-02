-- CreateTable
CREATE TABLE "courier_list" (
    "id" TEXT NOT NULL,
    "courier_code" TEXT NOT NULL,
    "courier_service_name" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courier_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "courier_list_id_key" ON "courier_list"("id");

-- AddForeignKey
ALTER TABLE "courier_list" ADD CONSTRAINT "courier_list_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
