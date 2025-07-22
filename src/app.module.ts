import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { DatabaseService } from './database/database.service';
import { PrismaService } from 'prisma/prisma.service';
import { PicController } from './pic/pic.controller';
import { PicService } from './pic/pic.service';
import { AuthModule } from './auth/auth.module';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsService } from './uploads/uploads.service';

@Module({
  imports: [AuthModule],
  controllers: [TodoController, PicController, UploadsController],
  providers: [TodoService, DatabaseService, PrismaService, PicService, UploadsService],
})
export class AppModule {}
