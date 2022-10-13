import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyDto, UpdateSocietyDto } from './dto';

@Injectable()
export class SocietyService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSocietyDto: CreateSocietyDto) {
    const { name } = createSocietyDto;
    if (!name) throw new BadRequestException('The name not provided');
    const created = this.prisma.society.create({ data: { name } });
    if (!created) throw new BadRequestException('The Society already exists');
    return created;
  }

  findAll() {
    return this.prisma.society.findMany();
  }

  findOne(id: number) {
    if (!id) throw new BadRequestException('The id not provided');
    const found = this.prisma.society.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('The Society not found');
    return found;
  }

  update(id: number, updateSocietyDto: UpdateSocietyDto) {
    if (!id) throw new BadRequestException('The id not provided');
    const { name } = updateSocietyDto;
    const updated = this.prisma.society.update({
      where: { id },
      data: { name },
    });
    if (!updated) throw new BadRequestException('The Society not updated');
    return updated;
  }

  remove(id: number) {
    if (!id) throw new BadRequestException('The id not provided');
    const removed = this.prisma.society.delete({ where: { id } });
    if (!removed) throw new BadRequestException('The Society not deleted');
    return removed;
  }
}
