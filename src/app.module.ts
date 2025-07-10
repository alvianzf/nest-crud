import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, DatabaseService],
})
export class AppModule {}
