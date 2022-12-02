import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOfficeDto, UpdateOfficeDto } from './dto';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  async create(createOfficeDto: CreateOfficeDto) {
    await this.ballotExists(createOfficeDto.ballotId);
    return await this.prisma.office.create({
      data: createOfficeDto,
      select: {
        id: true,
        name: true,
        createdAt: true,
        ballot: { select: { id: true, name: true } },
        _count: { select: { Candidate: true } },
        Candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.office
      .findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          ballot: { select: { id: true, name: true } },
          _count: { select: { Candidate: true } },
        },
      })
      .then((offices) => offices.sort((a, b) => a.id - b.id));
  }

  async findOne(id: number) {
    return await this.prisma.office.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        ballotId: true,
        ballot: { select: { id: true, name: true } },
        _count: { select: { Candidate: true } },
        Candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
          },
        },
      },
    });
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    await this.prisma.office.findUnique({ where: { id } });
    return await this.prisma.office.update({
      where: { id },
      data: updateOfficeDto,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        ballot: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    if (!this.findOne(id)) throw new BadRequestException('Office not found');
    return await this.prisma.office.delete({ where: { id } });
  }

  private async ballotExists(id: number) {
    const ballot = await this.prisma.ballot.findUnique({ where: { id } });
    if (!ballot) throw new BadRequestException('Ballot not found');
  }
}
