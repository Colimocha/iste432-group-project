import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBallotDto, UpdateBallotDto } from './dto';

@Injectable()
export class BallotService {
  constructor(private prisma: PrismaService) {}

  async create(createBallotDto: CreateBallotDto) {
    await this.societyExists(createBallotDto.societyId);
    return await this.prisma.ballot.create({ data: createBallotDto });
  }

  async findAll() {
    return await this.prisma.ballot.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.ballot.findUnique({ where: { id } });
  }

  async update(id: number, updateBallotDto: UpdateBallotDto) {
    await this.societyExists(updateBallotDto.societyId);
    return await this.prisma.ballot.update({
      where: { id },
      data: updateBallotDto,
    });
  }

  async remove(id: number) {
    if (this.findOne(id))
      throw new BadRequestException('Ballot does not exist');
    return await this.prisma.ballot.delete({ where: { id } });
  }

  private async societyExists(id: number) {
    const found = await this.prisma.society.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Society does not exist');
  }
}
