-- CreateTable
CREATE TABLE "invoice_histories" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'BELUM_DIBAYAR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_histories_id_key" ON "invoice_histories"("id");

-- AddForeignKey
ALTER TABLE "invoice_histories" ADD CONSTRAINT "invoice_histories_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
