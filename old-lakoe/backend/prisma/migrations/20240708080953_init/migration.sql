-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "prices" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "usersId" TEXT NOT NULL,
    "invoices_id" TEXT NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts_items" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "cart_id" TEXT NOT NULL,

    CONSTRAINT "carts_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "logo_attachment" TEXT NOT NULL,
    "banner_attachment" TEXT NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores_on_decorations" (
    "id" TEXT NOT NULL,

    CONSTRAINT "stores_on_decorations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decorations" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "store_on_decorations_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "operation_hours" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "open_at" TIMESTAMP(3) NOT NULL,
    "close_at" TIMESTAMP(3) NOT NULL,
    "is_off" BOOLEAN NOT NULL,

    CONSTRAINT "operation_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "message_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city_district" TEXT NOT NULL,
    "lattitude" TEXT NOT NULL,
    "Longitude" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "is_main_location" BOOLEAN NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "acc_number" TEXT NOT NULL,
    "acc_name" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachments" TEXT[],
    "is_active" BOOLEAN NOT NULL,
    "size" TEXT NOT NULL,
    "minimum_order" INTEGER NOT NULL,
    "categories_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "product_id" TEXT NOT NULL,
    "variant_option_id" TEXT NOT NULL,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_options" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "variant_option_id" TEXT NOT NULL,

    CONSTRAINT "variant_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_option_values" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "variant_option_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "prices" INTEGER NOT NULL,
    "service_charge" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "receiver_longitude" TEXT NOT NULL,
    "receiver_latitude" TEXT NOT NULL,
    "receiver_district" TEXT NOT NULL,
    "receiver_phone" TEXT NOT NULL,
    "receiver_address" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "courier_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "confirmation_payment_id" TEXT NOT NULL,
    "invoices_histories_id" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "invoices_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "moota_transaction_id" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "courier_code" TEXT NOT NULL,
    "courier_service_name" TEXT NOT NULL,
    "courier_service_code" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "order_id" SERIAL NOT NULL,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "confirmation_payment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "bank" TEXT NOT NULL,

    CONSTRAINT "confirmation_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_histories" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_storesTostores_on_decorations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_operation_hoursTostores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_message_templatesTostores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_locationTostores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_productsTostores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_id_key" ON "carts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_invoices_id_key" ON "carts"("invoices_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_items_id_key" ON "carts_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_id_key" ON "stores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_on_decorations_id_key" ON "stores_on_decorations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "decorations_id_key" ON "decorations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "operation_hours_id_key" ON "operation_hours"("id");

-- CreateIndex
CREATE UNIQUE INDEX "message_templates_id_key" ON "message_templates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location_id_key" ON "location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_id_key" ON "bank_accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "variants_id_key" ON "variants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_options_id_key" ON "variant_options"("id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_option_values_id_key" ON "variant_option_values"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_courier_id_key" ON "invoices"("courier_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_confirmation_payment_id_key" ON "invoices"("confirmation_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoices_histories_id_key" ON "invoices"("invoices_histories_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_invoices_id_key" ON "payments"("invoices_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_user_id_key" ON "payments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_moota_transaction_id_key" ON "payments"("moota_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "couriers_id_key" ON "couriers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "couriers_order_id_key" ON "couriers"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "confirmation_payment_id_key" ON "confirmation_payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_histories_id_key" ON "invoice_histories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_storesTostores_on_decorations_AB_unique" ON "_storesTostores_on_decorations"("A", "B");

-- CreateIndex
CREATE INDEX "_storesTostores_on_decorations_B_index" ON "_storesTostores_on_decorations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_operation_hoursTostores_AB_unique" ON "_operation_hoursTostores"("A", "B");

-- CreateIndex
CREATE INDEX "_operation_hoursTostores_B_index" ON "_operation_hoursTostores"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_message_templatesTostores_AB_unique" ON "_message_templatesTostores"("A", "B");

-- CreateIndex
CREATE INDEX "_message_templatesTostores_B_index" ON "_message_templatesTostores"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_locationTostores_AB_unique" ON "_locationTostores"("A", "B");

-- CreateIndex
CREATE INDEX "_locationTostores_B_index" ON "_locationTostores"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_productsTostores_AB_unique" ON "_productsTostores"("A", "B");

-- CreateIndex
CREATE INDEX "_productsTostores_B_index" ON "_productsTostores"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_invoices_id_fkey" FOREIGN KEY ("invoices_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_id_fkey" FOREIGN KEY ("id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decorations" ADD CONSTRAINT "decorations_store_on_decorations_id_fkey" FOREIGN KEY ("store_on_decorations_id") REFERENCES "stores_on_decorations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_variant_option_id_fkey" FOREIGN KEY ("variant_option_id") REFERENCES "variant_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_option_id_fkey" FOREIGN KEY ("variant_option_id") REFERENCES "variant_option_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_confirmation_payment_id_fkey" FOREIGN KEY ("confirmation_payment_id") REFERENCES "confirmation_payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_invoices_histories_id_fkey" FOREIGN KEY ("invoices_histories_id") REFERENCES "invoice_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoices_id_fkey" FOREIGN KEY ("invoices_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_storesTostores_on_decorations" ADD CONSTRAINT "_storesTostores_on_decorations_A_fkey" FOREIGN KEY ("A") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_storesTostores_on_decorations" ADD CONSTRAINT "_storesTostores_on_decorations_B_fkey" FOREIGN KEY ("B") REFERENCES "stores_on_decorations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_operation_hoursTostores" ADD CONSTRAINT "_operation_hoursTostores_A_fkey" FOREIGN KEY ("A") REFERENCES "operation_hours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_operation_hoursTostores" ADD CONSTRAINT "_operation_hoursTostores_B_fkey" FOREIGN KEY ("B") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_message_templatesTostores" ADD CONSTRAINT "_message_templatesTostores_A_fkey" FOREIGN KEY ("A") REFERENCES "message_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_message_templatesTostores" ADD CONSTRAINT "_message_templatesTostores_B_fkey" FOREIGN KEY ("B") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_locationTostores" ADD CONSTRAINT "_locationTostores_A_fkey" FOREIGN KEY ("A") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_locationTostores" ADD CONSTRAINT "_locationTostores_B_fkey" FOREIGN KEY ("B") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTostores" ADD CONSTRAINT "_productsTostores_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTostores" ADD CONSTRAINT "_productsTostores_B_fkey" FOREIGN KEY ("B") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
