-- CreateTable
CREATE TABLE "withdraw" (
    "id" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "bank" TEXT NOT NULL,
    "rekening" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Menunggu',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "withdraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "withdraw_id_key" ON "withdraw"("id");
