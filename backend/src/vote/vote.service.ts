import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoteDto, UpdateVoteDto } from './dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async create(createVoteDto: CreateVoteDto) {
    const { voted, result, submit_guid, isWriteIn, ballotId } = createVoteDto;
    if (!voted || !result || !submit_guid || !isWriteIn || !ballotId)
      throw new BadRequestException('Missing required fields');
    const created = await this.prisma.vote.create({ data: createVoteDto });
    if (!created) throw new BadRequestException('Vote not created');
    return created;
  }

  async findAll() {
    return await this.prisma.vote.findMany();
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.vote.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Vote not found');
    return found;
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    if (!id) throw new BadRequestException('Missing required fields');
    const updated = await this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
    if (!updated) throw new BadRequestException('Vote not updated');
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.vote.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Vote not found');
    const deleted = await this.prisma.vote.delete({ where: { id } });
    return deleted;
  }
}
