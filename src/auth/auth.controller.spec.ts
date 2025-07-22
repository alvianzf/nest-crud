import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('Auth With User Role', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    check: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  const mockGuard = {
    canActivate: jest.fn((context: ExecutionContext) => {
      const req: any = context.switchToHttp().getRequest();
      req.user = { role: 'USER' }; // Mock user role
      return true; // Allow access for testing
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        JwtService,
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('GET /auth [check] function', () => {
    it('should return a check message, welcome API message', () => {
      const result = { message: 'Hello API' };
      mockAuthService.check.mockResolvedValue(result);
      expect(controller.check()).toEqual(result);
      expect(mockAuthService.check).toHaveBeenCalled();
    });
  });
});
