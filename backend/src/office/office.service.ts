import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOfficeDto, UpdateOfficeDto } from './dto';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  async create(createOfficeDto: CreateOfficeDto) {
    await this.ballotExists(createOfficeDto.ballotId);
    return await this.prisma.office.create({ data: createOfficeDto });
  }

  async findAll() {
    return await this.prisma.office.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.office.findUnique({ where: { id } });
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    await this.prisma.office.findUnique({ where: { id } });
    return await this.prisma.office.update({
      where: { id },
      data: updateOfficeDto,
    });
  }

  async remove(id: number) {
    if (this.findOne(id)) throw new BadRequestException('Office not found');
    return await this.prisma.office.delete({ where: { id } });
  }

  private async ballotExists(id: number) {
    const ballot = await this.prisma.ballot.findUnique({ where: { id } });
    if (!ballot) throw new BadRequestException('Ballot not found');
  }
}
