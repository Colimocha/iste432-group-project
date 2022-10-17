import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBallotDto, UpdateBallotDto } from './dto';

@Injectable()
export class BallotService {
  constructor(private prisma: PrismaService) {}

  async create(createBallotDto: CreateBallotDto) {
    const { name, allowWriteIn, societyId } = createBallotDto;

    if (!name || !allowWriteIn || !societyId)
      throw new BadRequestException('Missing required fields');

    const created = await this.prisma.ballot.create({
      data: { name, allowWriteIn, societyId },
    });

    if (!created) throw new BadRequestException('Ballot not created');

    return created;
  }

  async findAll() {
    return await this.prisma.ballot.findMany();
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const found = await this.prisma.ballot.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Ballot not found');
    return found;
  }

  async update(id: number, updateBallotDto: UpdateBallotDto) {
    if (!id) throw new BadRequestException('Missing required fields');
    const { name, allowWriteIn, societyId } = updateBallotDto;
    const updated = await this.prisma.ballot.update({
      where: { id },
      data: { name, allowWriteIn, societyId },
    });
    if (!updated) throw new BadRequestException('Ballot not updated');
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Missing required fields');
    const removed = await this.prisma.ballot.delete({ where: { id } });
    if (!removed) throw new BadRequestException('Ballot not removed');
    return removed;
  }
}
