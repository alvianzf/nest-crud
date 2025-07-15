import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { DatabaseService } from './database/database.service';
import { PrismaService } from 'prisma/prisma.service';
import { PicController } from './pic/pic.controller';
import { PicService } from './pic/pic.service';

@Module({
  imports: [],
  controllers: [TodoController, PicController],
  providers: [TodoService, DatabaseService, PrismaService, PicService],
})
export class AppModule {}
