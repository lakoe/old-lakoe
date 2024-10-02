-- CreateTable
CREATE TABLE "voucher" (
    "id" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voucher_id_key" ON "voucher"("id");
