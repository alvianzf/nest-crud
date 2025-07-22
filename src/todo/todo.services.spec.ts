import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('TodoService', () => {
  let service: TodoService;
  let prismaMock: { todo: any };

  const todoMock = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    prismaMock = { todo: todoMock };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all todos', async () => {
      const data = [{ id: 1, title: 'Test', is_done: false }];
      todoMock.findMany.mockResolvedValue(data);

      const result = await service.findAll();
      expect(result).toEqual(data);
    });
  });

  describe('create', () => {
    it('creates a todo', async () => {
      const dto = { title: 'Test', is_done: false };
      const created = { id: 1, ...dto };
      todoMock.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
    });
  });

  describe('findOne', () => {
    it('finds by id', async () => {
      const todo = { id: 1, title: 'Test', is_done: false };
      todoMock.findUnique.mockResolvedValue(todo);

      const result = await service.findOne(1);
      expect(result).toEqual(todo);
    });
  });

  describe('update', () => {
    it('updates a todo', async () => {
      const update = { title: 'Updated', is_done: true };
      const resultData = { id: 1, ...update };
      todoMock.update.mockResolvedValue(resultData);

      const result = await service.update(1, update);
      expect(result).toEqual(resultData);
    });
  });

  describe('remove', () => {
    it('deletes a todo', async () => {
      todoMock.delete.mockResolvedValue(undefined);

      const result = await service.remove(1);
      expect(result).toBeUndefined();
    });
  });
});
