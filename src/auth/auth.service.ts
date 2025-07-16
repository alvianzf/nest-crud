import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/types/auth';
import { ApiResponse } from 'src/types/response';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  check() {
    return { message: 'Hello API' };
  }

  async register(newUser: Auth): Promise<ApiResponse> {
    const { username, email, password } = newUser;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
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

  login(user: Auth) {
    const payload = { username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
