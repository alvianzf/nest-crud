import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateAuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(createDto: CreateAuthDto): Promise<User> {
    const { username, email, password } = createDto;
    return this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }
}
