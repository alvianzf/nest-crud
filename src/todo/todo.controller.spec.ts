import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService, Todo } from './todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test',
    description: 'desc',
    is_done: false,
    created_at: new Date(),
    updated_at: new Date(),
    pic_id: null,
    pic: null,
  };

  const mockTodoService = {
    create: jest.fn().mockResolvedValue(mockTodo),
    findAll: jest.fn().mockResolvedValue([mockTodo]),
    findOne: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue({ ...mockTodo, title: 'Updated' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should create a todo', async () => {
    const dto: CreateTodoDto = {
      title: 'Test',
      description: 'desc',
      is_done: false,
    };
    await expect(controller.create(dto)).resolves.toEqual(mockTodo);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all todos', async () => {
    await expect(controller.findAll()).resolves.toEqual([mockTodo]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one todo', async () => {
    await expect(controller.findOne(1)).resolves.toEqual(mockTodo);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a todo', async () => {
    const dto: UpdateTodoDto = { title: 'Updated' };
    await expect(controller.update(1, dto)).resolves.toEqual({
      ...mockTodo,
      title: 'Updated',
    });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a todo', async () => {
    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
