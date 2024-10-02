-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_id_fkey";

-- AlterTable
ALTER TABLE "stores" ALTER COLUMN "slogan" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "domain" DROP NOT NULL,
ALTER COLUMN "logo_attachment" SET DEFAULT 'https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png',
ALTER COLUMN "banner_attachment" SET DEFAULT 'https://dummyimage.com/hd1080';

-- CreateTable
CREATE TABLE "_cartsTostores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_cartsTostores_AB_unique" ON "_cartsTostores"("A", "B");

-- CreateIndex
CREATE INDEX "_cartsTostores_B_index" ON "_cartsTostores"("B");

-- AddForeignKey
ALTER TABLE "_cartsTostores" ADD CONSTRAINT "_cartsTostores_A_fkey" FOREIGN KEY ("A") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cartsTostores" ADD CONSTRAINT "_cartsTostores_B_fkey" FOREIGN KEY ("B") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
