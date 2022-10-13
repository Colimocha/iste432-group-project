import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOfficeDto, UpdateOfficeDto } from './dto';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  async create(createOfficeDto: CreateOfficeDto) {
    const { name, ballotId } = createOfficeDto;
    if (!name || !ballotId)
      throw new BadRequestException('Missing required fields');

    const created = await this.prisma.office.create({ data: createOfficeDto });
    if (!created) throw new BadRequestException('Failed to create office');
    return created;
  }

  async findAll() {
    return await this.prisma.office.findMany();
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.office.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Office not found');
    return found;
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    if (!id) throw new BadRequestException('Missing required fields');
    const updated = await this.prisma.office.update({
      where: { id },
      data: updateOfficeDto,
    });
    if (!updated) throw new BadRequestException('Office not updated');
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.office.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Office not found');
    const removed = await this.prisma.office.delete({ where: { id } });
    return removed;
  }
}
