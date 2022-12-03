import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBallotDto, UpdateBallotDto } from './dto';

@Injectable()
export class BallotService {
  constructor(private prisma: PrismaService) {}

  async create(createBallotDto: CreateBallotDto) {
    await this.societyExists(createBallotDto.societyId);
    return await this.prisma.ballot.create({
      data: createBallotDto,
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  async findAll() {
    return await this.prisma.ballot
      .findMany({
        select: {
          id: true,
          name: true,
          allowWriteIn: true,
          start_date: true,
          end_date: true,
          createdAt: true,
          society: { select: { id: true, name: true } },
          _count: { select: { Vote: true } },
        },
      })
      .then((ballots) => ballots.sort((a, b) => a.id - b.id));
  }

  async findOne(id: number) {
    return await this.prisma.ballot.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        societyId: true,
        society: { select: { id: true, name: true } },
        Office: {
          select: {
            id: true,
            name: true,
            Candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
                image: true,
              },
            },
          },
        },
        Vote: true,
        _count: { select: { Vote: true } },
      },
    });
  }

  async findManyBySocietyId(societyId: number) {
    return (
      await this.prisma.ballot.findMany({
        where: { societyId },
        select: {
          id: true,
          name: true,
          allowWriteIn: true,
          start_date: true,
          end_date: true,
          createdAt: true,
          societyId: true,
          society: { select: { id: true, name: true } },
          _count: { select: { Vote: true } },
        },
      })
    ).filter((ballot) => {
      if (ballot.end_date !== null)
        return new Date(ballot.end_date) > new Date();
      return true;
    });
  }

  async update(id: number, updateBallotDto: UpdateBallotDto) {
    await this.societyExists(updateBallotDto.societyId);
    return await this.prisma.ballot.update({
      where: { id },
      data: updateBallotDto,
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        updatedAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    if (!(await this.findOne(id)))
      throw new BadRequestException('Ballot does not exist');
    return await this.prisma.ballot.delete({ where: { id } });
  }

  private async societyExists(id: number) {
    const found = await this.prisma.society.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Society does not exist');
  }
}
