-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cart_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discounts_id_key" ON "discounts"("id");

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
