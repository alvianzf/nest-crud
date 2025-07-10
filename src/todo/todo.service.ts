import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  is_done: boolean;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class TodoService {
  constructor(private readonly db: DatabaseService) {}

  async create(createDto: CreateTodoDto): Promise<Todo> {
    const { title, description, is_done = false } = createDto;
    const sql = `
      INSERT INTO todos (title, description, is_done)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await this.db.query<Todo>(sql, [title, description || null, is_done]);
    return result[0];
  }

  async findAll(): Promise<Todo[]> {
    return this.db.query<Todo>(`SELECT * FROM todos ORDER BY created_at DESC`);
  }

  async findOne(id: number): Promise<Todo> {
    const result = await this.db.query<Todo>(
      `SELECT * FROM todos WHERE id = $1`,
      [id],
    );
    if (result.length === 0) throw new Error('Todo not found');
    return result[0];
  }

  async update(id: number, updateDto: UpdateTodoDto): Promise<Todo> {
    const keys = Object.keys(updateDto);
    if (!keys.length) return this.findOne(id);

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = Object.values(updateDto);
    values.push(id);

    const sql = `
      UPDATE todos
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const result = await this.db.query<Todo>(sql, values);
    if (result.length === 0) throw new Error('Todo not found');
    return result[0];
  }

  async remove(id: number): Promise<void> {
    await this.db.query(`DELETE FROM todos WHERE id = $1`, [id]);
  }
}
