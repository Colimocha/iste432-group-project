import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCandidateDto, UpdateCandidateDto } from './dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(createCandidateDto: CreateCandidateDto) {
    await this.ballotExists(createCandidateDto.ballotId);
    await this.officeExists(createCandidateDto.officeId);
    return await this.prisma.candidate.create({ data: createCandidateDto });
  }

  async findAll() {
    return this.prisma.candidate
      .findMany()
      .then((candidates) => candidates.sort((a, b) => a.id - b.id));
  }

  async findOne(id: number) {
    return this.prisma.candidate.findUnique({ where: { id } });
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    await this.ballotExists(updateCandidateDto.ballotId);
    await this.officeExists(updateCandidateDto.officeId);
    return await this.prisma.candidate.update({
      where: { id },
      data: updateCandidateDto,
    });
  }

  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Candidate does not exist');
    return await this.prisma.candidate.delete({ where: { id } });
  }

  private async ballotExists(id: number) {
    const found = await this.prisma.ballot.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Ballot does not exist');
  }

  private async officeExists(id: number) {
    const found = await this.prisma.office.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Office does not exist');
  }
}
