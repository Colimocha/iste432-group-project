import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoteDto, UpdateVoteDto } from './dto';
import { nanoid } from 'nanoid';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async create(createVoteDto: CreateVoteDto) {
    await this.ballotExists(createVoteDto.ballotId);
    const vote = await this.prisma.vote.create({
      data: {
        ...createVoteDto,
        submit_guid: nanoid(7),
      },
    });
    return vote;
  }

  async findAll() {
    return await this.prisma.vote.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.vote.findUnique({ where: { id } });
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    await this.prisma.vote.findUnique({ where: { id } });
    return await this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  async remove(id: number) {
    if (this.findOne(id)) throw new BadRequestException('Vote not found');
    return await this.prisma.vote.delete({ where: { id } });
  }

  private async ballotExists(id: number) {
    const ballot = await this.prisma.ballot.findUnique({ where: { id } });
    if (!ballot) throw new BadRequestException('Ballot not found');
  }
}
