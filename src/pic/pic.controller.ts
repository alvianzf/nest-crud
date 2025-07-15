import { Controller, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PicService, Pic } from './pic.service';
// import { CreatePic } from '../dto/create-pic.dto';
// import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('pic')
export class PicController {
  constructor(private readonly picService: PicService) {}

  @Get()
  findAll(): Promise<Pic[]> {
    return this.picService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.picService.remove(id);
  }
}
