-- DropForeignKey
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_pic_id_fkey";

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Pic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
