import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { CreatePic } from '../dto/create-pic.dto';
// import { UpdatePic } from '../dto/update-pic.dto';

export interface Pic {
  id: number;
  name: string;
}

@Injectable()
export class PicService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Pic[]> {
    return await this.prisma.pic.findMany();
  }

  async findOne(id: number): Promise<Pic> {
    const pic = await this.prisma.pic.findUnique({
      where: { id },
    });
    if (!pic) throw new NotFoundException(`Pic with ID ${id} not found`);
    return pic;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.pic.delete({
      where: { id },
    });
  }
}
