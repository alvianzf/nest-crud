import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiResponse } from '../types/response';
import { hashPassword, comparePassword } from '../utils/password-hash';
import { CreateAuthDto, LoginDto } from '../dto/auth.dto';
// import { findUserByEmail, createUser } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  check(): { message: string } {
    return { message: 'Hello API' };
  }

  async register(newUser: CreateAuthDto): Promise<ApiResponse> {
    const { username, email, password } = newUser;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashed = await hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashed,
      },
    });

    return {
      message: 'User registered successfully',
      code: 201,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async login(
    user: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = user;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Email not registered');
    }

    await this.prisma.user.update({
      where: { id: existingUser.id },
      data: { last_login: new Date() },
    });

    if (!existingUser.password) {
      throw new UnauthorizedException('Password not set for this user');
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.generateToken(
      existingUser.id,
      existingUser.email,
      existingUser.role,
    );

    await this.prisma.user.update({
      where: { id: existingUser.id },
      data: {
        refresh_token: tokens.refresh_token,
      },
    });

    return tokens;
  }

  private async generateToken(
    userId: number,
    email: string,
    role: string | null,
  ) {
    const payload = { sub: userId, email, role };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
