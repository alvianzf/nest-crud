import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Global()
@Module({
  providers: [PrismaService, JwtStrategy],
  exports: [PrismaService, JwtStrategy],
})
export class PrismaModule {}
