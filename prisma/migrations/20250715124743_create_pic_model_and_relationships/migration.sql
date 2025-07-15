-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "pic_id" INTEGER;

-- CreateTable
CREATE TABLE "Pic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Pic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
