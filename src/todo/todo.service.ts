import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  is_done: boolean;
  created_at: Date;
  updated_at: Date;
  pic_id?: number | null;
  pic?: Pic | null; // Assuming you want to include related 'pic' data
}

export interface Pic {
  id: number;
  name: string;
}

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateTodoDto): Promise<Todo> {
    const { title, description, is_done = false } = createDto;
    return await this.prisma.todos.create({
      data: {
        title,
        description: description ?? null,
        is_done,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return await this.prisma.todos.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todos.findUnique({
      where: { id },
    });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    return todo;
  }

  async update(id: number, updateDto: UpdateTodoDto): Promise<Todo> {
    await this.findOne(id);
    return this.prisma.todos.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.todos.delete({
      where: { id },
    });
  }
}
