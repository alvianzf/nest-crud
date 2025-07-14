import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { DatabaseService } from './database/database.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, DatabaseService, PrismaService],
})
export class AppModule {}
