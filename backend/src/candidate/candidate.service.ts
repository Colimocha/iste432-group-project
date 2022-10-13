import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCandidateDto, UpdateCandidateDto } from './dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(createCandidateDto: CreateCandidateDto) {
    const { firstname, lastname, title, image, officeId, ballotId } =
      createCandidateDto;

    if (!firstname || !lastname || !title || !image || !officeId || !ballotId)
      throw new BadRequestException('Missing required fields');

    const created = await this.prisma.candidate.create({
      data: createCandidateDto,
    });
    if (!created) throw new BadRequestException('Failed to create candidate');
    return created;
  }

  async findAll() {
    return this.prisma.candidate.findMany();
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.candidate.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Candidate not found');
    return found;
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    if (!id) throw new BadRequestException('Missing required fields');
    const updated = await this.prisma.candidate.update({
      where: { id },
      data: updateCandidateDto,
    });
    if (!updated) throw new BadRequestException('Failed to update candidate');
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.candidate.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Candidate not found');
    const deleted = await this.prisma.candidate.delete({ where: { id } });
    return deleted;
  }
}
