import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyDto, UpdateSocietyDto } from './dto';

@Injectable()
export class SocietyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSocietyDto: CreateSocietyDto) {
    return this.prisma.society.create({ data: createSocietyDto });
  }

  async findAll() {
    return this.prisma.society.findMany();
  }

  async findOne(id: number) {
    return this.prisma.society.findUnique({ where: { id } });
  }

  async update(id: number, updateSocietyDto: UpdateSocietyDto) {
    return this.prisma.society.update({
      where: { id },
      data: updateSocietyDto,
    });
  }

  async remove(id: number) {
    if (this.findOne(id)) throw new BadRequestException('Society not found');
    return this.prisma.society.delete({ where: { id } });
  }
}
